import { List, Stack, Heading } from '@chakra-ui/react'
import Specialty from '@src/components/atoms/Cards/Specialty'
import { Patient } from '@src/types'
import React from 'react'

export default function SpecialtiesList({
  specialties,
  label,
  patient
}: {
  patient?: Patient
  specialties: { name: string; id: string }[]
  label: string
}) {
  return (
    <Stack spacing={3} className="h-full" data-testid="specialties-list">
      {specialties.length > 0 && label && (
        <Heading as="h2" size="sm" noOfLines={1} className="mb-4">
          {label}
        </Heading>
      )}
      <List spacing={3} className="h-full overflow-scroll pb-24">
        {specialties.map((specialty) => (
          <Specialty
            name={specialty.name}
            id={String(specialty.id)}
            key={`specialty-${specialty.id}`}
            patient={patient}
          />
        ))}
      </List>
    </Stack>
  )
}
