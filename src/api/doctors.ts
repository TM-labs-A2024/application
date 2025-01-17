import { Doctor, DoctorUpdate, Login, LoginResponse, Patient } from '@src/types'

import { axiosClient } from './clients'

export function createDoctor(body: DoctorUpdate) {
  return axiosClient.post<Doctor>('/doctors', body)
}

export function updateDoctor(body: DoctorUpdate) {
  return axiosClient.put<Doctor>('/doctors', body)
}

export function loginDoctor(body: Login) {
  return axiosClient.post<LoginResponse>('/doctors/login', body)
}

export function getDoctorPatients(doctorId: string) {
  return axiosClient.get<Patient[]>(`/doctors/patients/${doctorId}`)
}

export function getDoctors() {
  return axiosClient.get<Doctor[]>('/doctors')
}

export function getDoctorById(doctorId: string) {
  return axiosClient.get<Doctor>(`/doctors/${doctorId}`)
}

export function getInstitutionDoctors(institutionId: string) {
  return axiosClient.get<Doctor[]>(`/doctors/institutions/${institutionId}`)
}
