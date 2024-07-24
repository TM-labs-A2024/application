import { Doctor, Login, LoginResponse, Patient } from '@src/types'

import { axiosClient } from './clients'

export function createDoctor(body: Doctor) {
  return axiosClient.post<Doctor>('/doctors', body)
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
