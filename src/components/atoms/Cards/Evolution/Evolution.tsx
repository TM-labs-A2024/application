import { Link } from '@chakra-ui/next-js'
import { Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

import Chevron from '../../../../../public/static/icons/chevron.svg'

export default function Evolution({
  href,
  title,
  description,
  comment
}: {
  href: string
  title: string
  description: string
  comment: string
}) {
  return (
    <Link as={NextLink} href={href} padding="0.5rem" className="w-full">
      <div className="mb-1 flex flex-row items-center justify-between">
        <div className="flex flex-col items-start gap-1">
          <Text fontSize="md" as="b">
            {title}
          </Text>
          <div className="flex flex-col items-start gap-1">
            <Text>{description}</Text>
            <Text>{comment}</Text>
          </div>
        </div>
        <Chevron />
      </div>
    </Link>
  )
}
