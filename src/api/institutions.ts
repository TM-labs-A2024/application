import { Institution, InstitutionRegister, Login, LoginResponse } from '@src/types'

import { axiosClient } from './clients'

export function createInstitution(body: InstitutionRegister) {
  return axiosClient.post<Institution>('/institutions', body)
}

export function getInstitutions() {
  return axiosClient.get<Institution[]>('/institutions')
}

export function loginInstitution(data: Login) {
  return axiosClient.post<LoginResponse>('/institutions/users/login', data)
}
