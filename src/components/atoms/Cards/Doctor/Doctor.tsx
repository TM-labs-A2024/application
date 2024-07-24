import { Link } from '@chakra-ui/next-js'
import { Text } from '@chakra-ui/react'
import { specialties } from '@constants/index'
import { Doctor as DoctorType } from '@src/types'
import NextLink from 'next/link'
import React from 'react'

import Chevron from '../../../../../public/static/icons/chevron.svg'

export default function Doctor({ doctor }: { doctor: DoctorType }) {
  // --- Data and handlers -----------------------------------------------------
  const doctorSpecialtiesList = doctor.specialties?.map(
    (specialty, idx) =>
      `${specialties.find((el) => el.id === specialty)?.name}${
        doctor.specialties.length > 0 && idx !== doctor.specialties.length - 1 ? ',' : ''
      }${idx === doctor.specialties.length - 1 ? '.' : ' '}`
  )
  // --- END: Data and handlers ------------------------------------------------

  return (
    <Link
      as={NextLink}
      href={`/medico/${doctor.id}/${doctor.requestId}`}
      className="w-full"
      data-testid="doctor-card"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col items-start gap-1 overflow-hidden">
          <Text>
            {doctor.firstname} {doctor.lastname}
          </Text>
          <div className="flex flex-row flex-wrap items-center gap-2">
            <Text className="text-nowrap">CI: {doctor.govId}</Text>
            <Text className="text-wrap">{doctorSpecialtiesList}</Text>
          </div>
        </div>
        <Chevron />
      </div>
    </Link>
  )
}
