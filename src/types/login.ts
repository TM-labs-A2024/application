import { Patient, Doctor, Institution, Nurse } from './index'
export type Login = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  id?: string
  patient?: Patient
  doctor?: Doctor
  user?: Institution
  nurse?: Nurse
}
