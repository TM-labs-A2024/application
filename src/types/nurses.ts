export type Nurse = {
  id: string
  govId: string
  firstname: string
  lastname: string
  birthdate: string
  email: string
  phoneNumber: string
  password?: string
  pending?: boolean
  approved?: boolean
  requestId?: boolean
}
