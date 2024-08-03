export type Institution = {
  id: string
  name: string
  credentials: string
  address: string
  email?: string
  phoneNumber?: string
  pending?: boolean
  password?: string
}

export type InstitutionRegister = {
  name: string
  govId: string
  credentials: string
  type: string
  address: string
  institutionUser: {
    firstname: string
    lastname: string
    govId: string
    birthdate: string
    email: string
    password: string
    phoneNumber: string
    role: string
  }
}

export type DoctorsRequests = {
  id: string
  institutionId: string
  doctorId: string
  pending: true
  approved: false
  'professional-type': string
}
