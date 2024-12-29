import { Link } from '@chakra-ui/next-js'
import { Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

import Chevron from '../../../../../public/static/icons/chevron.svg'

export default function Request({
  href,
  title,
  description
}: {
  href: string
  title: string
  description: string
}) {
  return (
    <Link as={NextLink} href={href} className="w-full" data-testid="request-card">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col items-start gap-1">
          <Text fontSize="md" as="b">
            {title}
          </Text>
          <Text>{description}</Text>
        </div>
        <Chevron />
      </div>
    </Link>
  )
}
