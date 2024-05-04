export type Patient = {
  uuid: string
  specialities: number[]
  gender: string
  firstname: string
  lastname: string
  govId: string
  birthdate: string
  email: string
  phoneNumber: string
  pending?: boolean
  status?: string
  bed?: string
}
