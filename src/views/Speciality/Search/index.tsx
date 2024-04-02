import SpecialitySearch from '@components/organisms/Search/Speciality'
import { Evolution, ReactSelectOption } from '@src/types'
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
    fromDate: string
    toDate: string
    type: ReactSelectOption
    setFromDate: React.Dispatch<React.SetStateAction<string>>
    setToDate: React.Dispatch<React.SetStateAction<string>>
    setType: React.Dispatch<React.SetStateAction<ReactSelectOption>>
  }
}) {
  return <SpecialitySearch context={context} />
}
