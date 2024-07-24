import { EvolutionResponse, EvolutionBody } from '@src/types'

import { axiosClient } from './clients'

export function createRecord(body: EvolutionBody) {
  return axiosClient.post<EvolutionResponse>('/health-record', body)
}
