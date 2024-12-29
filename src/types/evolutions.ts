import { ReactSelectOption } from './forms'

export type Evolution = {
  id: string
  type?: string
  title?: string
  date: string
  author: string
  reason?: string
}

export type EvolutionResponse = {
  id: string
  type: string
  title: string
  description: string
  content: string
  author: string
  specialty: {
    id: string
    description: string
    name: string
  }
  'content-format': string
  created_at: string
}

export type EvolutionFormData = {
  type: ReactSelectOption | null
  reason: string
  description: string
  history: string
  examination: string
  summary: string
  diagnostic: string
  comments: string
}

export type EvolutionJSONBody = {
  specialty: string
  patientId: string
  bed?: string
  title: string
  description: string
  payload: EvolutionFormData
}

export type AttachmentFormData = {
  title: string
  description: string
  attachment: File[]
}

export type EvolutionBody = FormData

export type CardEvolution = {
  href: string
  title?: string
  description: string
  comment: string
}

export type Evolutions = Evolution[]
