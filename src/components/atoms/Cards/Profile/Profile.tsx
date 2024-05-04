import { WarningIcon } from '@chakra-ui/icons'
import { Link } from '@chakra-ui/next-js'
import { Text, Tag, TagLeftIcon, TagLabel } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

import Chevron from '../../../../../public/static/icons/chevron.svg'

export default function Profile({
  href,
  title,
  description,
  status
}: {
  href: string
  title: string
  description: string
  status?: string
}) {
  return (
    <Link as={NextLink} href={href} className="w-full">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col items-start gap-1">
          <Text fontSize="md" as="b">
            {title}
          </Text>
          <Text>{description}</Text>
        </div>
        {status && (
          <Tag size="md" key={status} variant="subtle" colorScheme="gray">
            <TagLeftIcon boxSize="12px" as={WarningIcon} />
            <TagLabel>{status}</TagLabel>
          </Tag>
        )}
        <Chevron />
      </div>
    </Link>
  )
}