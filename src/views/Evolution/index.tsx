import Evolution from '@components/organisms/Evolution'
import React from 'react'

export default function EvolutionView({
  speciality,
  title,
  data
}: {
  speciality: string
  title: string
  data: {
    title: string
    content: string
  }[]
}) {
  return <Evolution speciality={speciality} title={title} data={data} />
}
