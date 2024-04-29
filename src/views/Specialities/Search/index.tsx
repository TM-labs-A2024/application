import SpecialitiesSearch from '@components/organisms/Search/Specialities'
import React from 'react'

export default function SpecialitiesSearchView({
  context
}: {
  context: {
    onChange: (value: string) => void
    specialities: {
      id: number
      name: string
    }[]
    matches: string
    uuid?: string
  }
}) {
  return <SpecialitiesSearch context={context} />
}
