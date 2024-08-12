import { WarningIcon } from '@chakra-ui/icons'
import { Link } from '@chakra-ui/next-js'
import { Text, Tag, TagLeftIcon, TagLabel, Tooltip } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

import Chevron from '../../../../../public/static/icons/chevron.svg'

export default function Patient({
  href,
  title,
  description,
  status,
  hospitalizationPlace
}: {
  href: string
  title: string
  description: string
  status?: string
  hospitalizationPlace?: string
}) {
  return (
    <Link as={NextLink} href={href} className="w-full" data-testid="patient-card">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col items-start gap-1">
          <Text fontSize="md" as="b">
            {title}
          </Text>
          <Text>{description}</Text>
        </div>
        {status === 'hospitalizado' && (
          <Tooltip label={hospitalizationPlace}>
            <Tag size="md" key={status} variant="subtle" colorScheme="gray">
              <TagLeftIcon boxSize="12px" as={WarningIcon} />
              <TagLabel>{status}</TagLabel>
            </Tag>
          </Tooltip>
        )}
        <Chevron />
      </div>
    </Link>
  )
}
