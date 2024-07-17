export type Doctor = {
  id: number | string
  institutionId: string
  firstname: string
  lastname: string
  birthdate: string
  email: string
  phoneNumber: string
  credentials: string
  specialties: (string | number | null | undefined)[]
  pending?: boolean
  patientPending?: boolean
  password?: string
}
