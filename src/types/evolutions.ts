export type Evolution = {
  id: number
  type?: string
  title?: string
  date: string
  author: string
  reason?: string
}

export type CardEvolution = {
  href: string
  title?: string
  description: string
  comment: string
}

export type Evolutions = Evolution[]
