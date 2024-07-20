import { Login, LoginResponse, Nurse } from '@src/types'

import { axiosClient } from './clients'

export function createNurse(body: Nurse) {
  return axiosClient.post<Nurse>('/patients', body)
}

export function loginNurse(body: Login) {
  return axiosClient.post<LoginResponse>('/patients/login', body)
}
