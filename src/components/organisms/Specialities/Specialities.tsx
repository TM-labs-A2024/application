import SpecialitiesList from '@components/molecules/SpecialitiesList'
import { specialties } from '@src/constants'
import React from 'react'

export default function Specialities() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <SpecialitiesList specialities={specialties} />
    </div>
  )
}
