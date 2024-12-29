import { Login, LoginResponse, InstitutionAccessRequest } from '@src/types'

import { axiosClient } from './clients'

export function loginGovernment(data: Login) {
  return axiosClient.post<LoginResponse>('/goverment/login', data)
}

export function approveInstitutionsAccessRequests(requestId: string) {
  return axiosClient.post(`/government/enrollment-requests/${requestId}/approve`)
}

export function denyInstitutionsAccessRequests(requestId: string) {
  return axiosClient.post(`/government/enrollment-requests/${requestId}/deny`)
}

export function revokeInstitutionsAccessRequests(institutionId: string) {
  return axiosClient.post(`/government/enrollment/${institutionId}/revoke`)
}

export function getGovernmentRequests() {
  return axiosClient.get<InstitutionAccessRequest[]>('/government/enrollment-requests')
}
