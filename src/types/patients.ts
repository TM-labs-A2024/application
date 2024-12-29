export type Patient = {
  id?: string
  specialties?: string[]
  sex?: string
  firstname: string
  lastname: string
  govId: string
  birthdate: string
  email: string
  phoneNumber: string
  pending?: boolean
  status?: string
  bed?: string
  password?: string
  institution_id?: string
}

export type PatientSummary = {
  href: string
  title: string
  description: string
  status?: string
  pending?: boolean
  hospitalizationPlace?: string
}
