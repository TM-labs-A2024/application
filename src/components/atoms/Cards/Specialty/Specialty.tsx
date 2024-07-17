import { Link } from '@chakra-ui/next-js'
import { Text, Avatar } from '@chakra-ui/react'
import { Patient } from '@src/types'
import NextLink from 'next/link'
import React from 'react'

import Chevron from '../../../../../public/static/icons/chevron.svg'

export default function Specialty({
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
      href={patient ? `/especialidad/${patient?.id}/${id}` : `/especialidad/${id}`}
      className="border-1 flex w-full rounded-md border border-gray-400 p-4"
      data-testid="specialty-card"
    >
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <Avatar name={name} src="/" />
          <Text className="ml-4">{name}</Text>
        </div>
        <Chevron />
      </div>
    </Link>
  )
}
