import { Login, LoginResponse, Nurse } from '@src/types'

import { axiosClient } from './clients'

export function createNurse(body: Nurse) {
  return axiosClient.post<Nurse>('/nurses', body)
}

export function getNurses() {
  return axiosClient.get<Nurse[]>('/nurses')
}

export function getNurse(nurseId: string) {
  return axiosClient.get<Nurse>(`/nurses/${nurseId}`)
}

export function loginNurse(body: Login) {
  return axiosClient.post<LoginResponse>('/nurses/login', body)
}

export function getInstitutionNurses(institutionId: string) {
  return axiosClient.get<Nurse[]>(`/nurses/institutions/${institutionId}`)
}
