import { Patient } from '@src/types'

import { axiosClient } from './clients'

export function createPatient(body: Patient) {
  return axiosClient.post<Patient>('/nurses', body)
}
