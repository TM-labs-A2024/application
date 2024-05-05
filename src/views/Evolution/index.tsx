import Evolution from '@components/organisms/Evolution'
import { Patient } from '@src/types'
import React from 'react'

export default function EvolutionView({
  patient,
  goBackRef,
  title,
  data
}: {
  patient?: Patient
  goBackRef: string
  title: string
  data: {
    title: string
    content: string
  }[]
}) {
  return <Evolution patient={patient} goBackRef={goBackRef} title={title} data={data} />
}
