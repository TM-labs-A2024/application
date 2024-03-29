import { Link } from '@chakra-ui/next-js'
import { Text, Avatar } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

import Chevron from '../../../../../public/static/icons/chevron.svg'

export default function Speciality({ name, id }: { name: string; id: string }) {
  return (
    <Link
      as={NextLink}
      href={`/especialidad/${id}`}
      className="border-1 flex w-full rounded-md border border-gray-400 p-4"
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
