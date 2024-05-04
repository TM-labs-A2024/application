import Evolution from '@components/organisms/Evolution'
import React from 'react'

export default function EvolutionView({
  goBackRef,
  title,
  data
}: {
  goBackRef: string
  title: string
  data: {
    title: string
    content: string
  }[]
}) {
  return <Evolution goBackRef={goBackRef} title={title} data={data} />
}
