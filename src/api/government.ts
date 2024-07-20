import { Login, LoginResponse } from '@src/types'

import { axiosClient } from './clients'

export function loginGovernment(data: Login) {
  return axiosClient.post<LoginResponse>('/goverment/login', data)
}
