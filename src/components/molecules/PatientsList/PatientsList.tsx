import { List, Stack, Heading } from '@chakra-ui/react'
import Patient from '@components/atoms/Cards/Patient'
import React from 'react'

export default function PatientsList({
  patients,
  label
}: {
  patients: {
    href: string
    title: string
    description: string
    status?: string
  }[]
  label: string
}) {
  return (
    <Stack spacing={3} className="h-full">
      {patients.length > 0 && label && (
        <Heading as="h2" size="sm" noOfLines={1} className="mb-4">
          {label}
        </Heading>
      )}
      <List spacing={3} className="h-full overflow-auto">
        {patients.map((patient) => (
          <div className="border-b border-black py-4 last:border-transparent" key={patient.href}>
            <Patient
              href={patient.href}
              title={patient.title}
              description={patient.description}
              status={patient.status}
            />
          </div>
        ))}
      </List>
    </Stack>
  )
}
