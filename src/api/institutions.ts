import { Institution, InstitutionRegister, Login, LoginResponse, DoctorsRequests } from '@src/types'

import { axiosClient } from './clients'

export function createInstitution(body: InstitutionRegister) {
  return axiosClient.post<Institution>('/institutions', body)
}

export function getInstitutions() {
  return axiosClient.get<Institution[]>('/institutions')
}

export function getApprovedInstitutions() {
  return axiosClient.get<Institution[]>('/institutions/approved')
}

export function getInstitution(institutionId: string) {
  return axiosClient.get<Institution>(`/institutions/${institutionId}`)
}

export function loginInstitution(data: Login) {
  return axiosClient.post<LoginResponse>('/institutions/users/login', data)
}

export function getInstitutionRequests() {
  return axiosClient.get<DoctorsRequests[]>('/institutions/enrollment-requests')
}

export function approveDoctorsAccessRequests(requestId: string) {
  return axiosClient.post(`/institutions/enrollment-requests/${requestId}/approve`)
}

export function denyDoctorsAccessRequests(requestId: string) {
  return axiosClient.post(`/institutions/enrollment-requests/${requestId}/deny`)
}

export function revokeDoctorsAccessRequests(doctorId: string) {
  return axiosClient.post(`/institutions/enrollment/${doctorId}/revoke`)
}
