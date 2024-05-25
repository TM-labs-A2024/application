import { Link } from '@chakra-ui/next-js'
import { Text, Avatar } from '@chakra-ui/react'
import { Patient } from '@src/types'
import NextLink from 'next/link'
import React from 'react'

import Chevron from '../../../../../public/static/icons/chevron.svg'

export default function Speciality({
  name,
  id,
  patient
}: {
  name: string
  id: string
  patient?: Patient
}) {
  return (
    <Link
      as={NextLink}
      href={patient ? `/especialidad/${patient?.uuid}/${id}` : `/especialidad/${id}`}
      className="border-1 flex w-full rounded-md border border-gray-400 p-4"
      data-testid="speciality-card"
    >
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <Avatar name={name} src="/" />
          <Text>{name}</Text>
        </div>
        <Chevron />
      </div>
    </Link>
  )
}
