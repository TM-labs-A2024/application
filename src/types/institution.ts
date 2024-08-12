export type Institution = {
  id: string
  govId: string
  name: string
  credentials: string
  address: string
  email?: string
  phoneNumber?: string
  pending?: boolean
  approved?: boolean
  password?: string
  requestId?: string
  institutionUser?: {
    id: string
    firstname: string
    lastname: string
    govId: string
    birthdate: string
    email: string
    phoneNumber: string
    role: string
    institutionId: string
  }
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
  nurseId?: string
  pending: boolean
  approved: boolean
  'professional-type': string
}

export type InstitutionAccessRequest = {
  id: string
  institutionId: string
  pending: boolean
  approved: boolean
}
