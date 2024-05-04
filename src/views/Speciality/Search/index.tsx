import SpecialitySearch from '@components/organisms/Search/Speciality'
import { Evolutions, ReactSelectOption } from '@src/types'
import React from 'react'

export default function SpecialitySearchView({
  context
}: {
  context: {
    goBackRef: string
    onChange: (value: string) => void
    data: {
      evolutions: Evolutions
      orders: Evolutions
      tests: Evolutions
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
