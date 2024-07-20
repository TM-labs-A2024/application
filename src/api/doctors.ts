import { Doctor, Login, LoginResponse } from '@src/types'

import { axiosClient } from './clients'

export function createDoctor(body: Doctor) {
  return axiosClient.post<Doctor>('/doctors', body)
}

export function loginDoctor(body: Login) {
  return axiosClient.post<LoginResponse>('/doctors/login', body)
}
