export type Doctor = {
  id: number | string
  firstname: string
  lastname: string
  birthdate: string
  email: string
  phone: string
  specialities: number[]
  pending?: boolean
}
