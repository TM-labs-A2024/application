import { List, Stack, Heading } from '@chakra-ui/react'
import Request from '@components/atoms/Cards/Request'
import React from 'react'

export default function RequestsList({
  requests,
  label
}: {
  requests: {
    href: string
    title: string
    description: string
  }[]
  label: string
}) {
  return (
    <Stack className="h-full" data-testid="requests-list">
      {requests.length > 0 && label && (
        <Heading as="h2" size="sm" className="mb-4">
          {label}
        </Heading>
      )}
      <div className="overflow-auto">
        {requests.length > 0 && (
          <List>
            {requests?.map((request) => (
              <div
                className="border-b border-black py-4 last:border-transparent"
                key={request.href}
              >
                <Request
                  href={request.href}
                  title={request.title}
                  description={request.description}
                />
              </div>
            ))}
          </List>
        )}
      </div>
    </Stack>
  )
}
