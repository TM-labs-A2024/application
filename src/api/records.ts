import { EvolutionResponse, EvolutionBody, EvolutionJSONBody } from '@src/types'

import { axiosClient, axiosClientImage } from './clients'

export function createRecord(body: EvolutionBody) {
  return axiosClientImage.post<EvolutionResponse>('/health-record', body)
}

export function createEvolution(body: EvolutionJSONBody) {
  return axiosClient.post<EvolutionResponse>('/health-record/evolution', body)
}

export function deleteRecord(recordId: string) {
  return axiosClient.delete(`/health-record/${recordId}`)
}

export function deleteAttachment(recordId: string) {
  return axiosClient.post(`/health-record/${recordId}/detach`)
}

export function getRecords(specialtyId: string, govId: string) {
  return axiosClient.get<EvolutionResponse[]>(`/patients/${govId}/health-records/${specialtyId}`)
}

export function getRecord(recordId: string) {
  return axiosClient.get<EvolutionResponse>(`/health-record/${recordId}`)
}
