export type Evolution = {
  id: string
  type?: string
  title?: string
  date: string
  author: string
  reason?: string
}

export type EvolutionBody = {
  specialty: string
  patientId: string
  type: string
  payload:
    | {
        title: string
        content: string
      }[]
    | {
        title: string
        description: string
        attachment: { 0: FormData }
      }
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
}

export type CardEvolution = {
  href: string
  title?: string
  description: string
  comment: string
}

export type Evolutions = Evolution[]
