import PatientsSearch from '@components/organisms/Search/Patients'
import React from 'react'

export default function PatientsSearchView({
  context
}: {
  context: {
    onChange: (value: string) => void
    specialities: {
      id: number
      name: string
    }[]
    matches: string
  }
}) {
  return <PatientsSearch context={context} />
}
