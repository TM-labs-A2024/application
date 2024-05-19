import SpecialitiesSearch from '@components/organisms/Search/Specialities'
import React from 'react'

export default function SpecialitiesSearchVie({
  context
}: {
  context: {
    specialities: {
      id: number
      name: string
    }[]
    uuid?: string
  }
}) {
  return <SpecialitiesSearch context={context} />
}
