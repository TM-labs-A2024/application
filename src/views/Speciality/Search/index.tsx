import SpecialitySearch from '@components/organisms/Search/Speciality'
import { Evolution } from '@src/types'
import React from 'react'

export default function SpecialitySearchView({
  context
}: {
  context: {
    speciality: string | string[] | undefined
    onChange: (value: string) => void
    data: {
      evolutions: Evolution
      orders: Evolution
      tests: Evolution
    }
    matches: string
  }
}) {
  return <SpecialitySearch context={context} />
}
