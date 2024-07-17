import { Nurse } from '@src/types'

import { axiosClient } from './clients'

export function createNurse(body: Nurse) {
  return axiosClient.post<Nurse>('/patients', body)
}
