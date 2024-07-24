import { LoginResponse, Login, Patient, AccessRequest, Specialty } from '@src/types'

import { axiosClient } from './clients'

export function getPatientByGovId(govId: string) {
  return axiosClient.get<Patient>(`/patients/${govId}`)
}

export function createPatient(body: Patient) {
  return axiosClient.post<Patient>('/patients', body)
}

export function loginPatient(body: Login) {
  return axiosClient.post<LoginResponse>('/patients/login', body)
}

export function requestAccess(patientId: string) {
  return axiosClient.post<LoginResponse>(`/patients/${patientId}/access-requests`)
}

export function getPatients() {
  return axiosClient.get<Patient[]>('/patients')
}

export function getPatientsAccessRequests() {
  return axiosClient.get<AccessRequest[]>('/patients/access-requests')
}

export function approvePatientsAccessRequests(requestId: string) {
  return axiosClient.post(`/patients/access-requests/${requestId}/approve`)
}

export function denyPatientsAccessRequests(requestId: string) {
  return axiosClient.post(`/patients/access-requests/${requestId}/deny`)
}

export function revokePatientsAccessRequests(doctorId: string) {
  return axiosClient.post(`/patients/access/${doctorId}/revoke`)
}

export function getPatientsSpecialties(govId: string) {
  return axiosClient.get<Specialty[]>(`/patients/${govId}/health-records/specialties`)
}
