import { Link } from '@chakra-ui/next-js'
import { Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

import Chevron from '../../../../../public/static/icons/chevron.svg'

export default function Doctor({
  doctor
}: {
  doctor: {
    id: number
    speciality: string
    firstname: string
    lastname: string
    birthdate: string
    email: string
    phone: string
  }
}) {
  return (
    <Link as={NextLink} href={`/medico/${doctor.id}`} padding="0.5rem" className="w-full">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col items-start gap-1">
          <Text>
            {doctor.firstname} {doctor.lastname}
          </Text>
          <div className="flex flex-row items-center gap-4">
            <Text>CI: {doctor.id.toLocaleString('es-ES')}</Text>
            <Text>{doctor.speciality}</Text>
          </div>
        </div>
        <Chevron />
      </div>
    </Link>
  )
}
