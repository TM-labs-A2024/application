import { ReactSelectOption } from './forms'

export type Evolution = {
  id: string
  type?: string
  title?: string
  date: string
  author: string
  reason?: string
}

export type EvolutionFormData = {
  type: ReactSelectOption | null
  reason: string
  description: string
  history: string
  examination: string
  comments: string
}

export type EvolutionBody = FormData

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
}

export type CardEvolution = {
  href: string
  title?: string
  description: string
  comment: string
}

export type Evolutions = Evolution[]
