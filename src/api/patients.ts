import { LoginResponse, Login, Patient } from '@src/types'

import { axiosClient } from './clients'

export function createPatient(body: Patient) {
  return axiosClient.post<Patient>('/patients', body)
}

export function loginPatient(body: Login) {
  return axiosClient.post<LoginResponse>('/patients/login', body)
}
