export type Doctor = {
  id: string
  institutionId: string
  firstname: string
  lastname: string
  birthdate: string
  email: string
  sex?: string
  govId: string
  phoneNumber: string
  credentials: string
  specialities?: {
    id: string
    description: string
    name: string
  }[]
  specialties: {
    id: string
    description: string
    name: string
  }[]
  pending?: boolean
  approved?: boolean
  patientPending?: boolean
  password?: string
  requestId?: string
}

export type DoctorUpdate = {
  specialties: string[]
}

export type AccessRequest = {
  id: string
  pending: boolean
  approved: boolean
  patientId: string
  doctorId: string
}
