import PatientsSearch from '@components/organisms/Search/Patients'
import { ReactSelectOption } from '@src/types'
import React from 'react'

export default function PatientsSearchView({
  context
}: {
  context: {
    onChange: (value: string) => void
    patients: {
      href: string
      title: string
      description: string
      status: string | undefined
      pending: boolean | undefined
    }[]
    matches: string
    fromDate: string
    toDate: string
    gender: ReactSelectOption
    status: ReactSelectOption
    speciality: ReactSelectOption
    setFromDate: React.Dispatch<React.SetStateAction<string>>
    setToDate: React.Dispatch<React.SetStateAction<string>>
    setGender: React.Dispatch<React.SetStateAction<ReactSelectOption>>
    setStatus: React.Dispatch<React.SetStateAction<ReactSelectOption>>
    setSpeciality: React.Dispatch<React.SetStateAction<ReactSelectOption>>
  }
}) {
  return <PatientsSearch context={context} />
}
