'use client'

import { Heading } from '@chakra-ui/react'
import DoctorList from '@components/molecules/DoctorsList/DoctorsList'
import { doctors } from '@constants/index'
import React from 'react'

export default function Doctors() {
  return (
    <div className="mx-auto block h-screen w-screen overflow-hidden px-8 pt-8 lg:w-1/2">
      <Heading as="h2" size="lg" mb={4} noOfLines={1}>
        Medicos con acceso
      </Heading>
      <DoctorList doctors={doctors} />
    </div>
  )
}
