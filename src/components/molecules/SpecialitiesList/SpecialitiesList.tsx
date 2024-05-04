import { List, Stack, Heading } from '@chakra-ui/react'
import Speciality from '@components/atoms/Cards/Speciality'
import { Patient } from '@src/types'
import React from 'react'

export default function SpecialitiesList({
  specialities,
  label,
  patient
}: {
  patient?: Patient
  specialities: { name: string; id: number }[]
  label: string
}) {
  return (
    <Stack spacing={3} className="h-full">
      {specialities.length > 0 && label && (
        <Heading as="h2" size="sm" noOfLines={1} className="mb-4">
          {label}
        </Heading>
      )}
      <List spacing={3} className="h-full overflow-scroll pb-24">
        {specialities.map((speciality) => (
          <Speciality
            name={speciality.name}
            id={String(speciality.id)}
            key={`speciality-${speciality.id}`}
            patient={patient}
          />
        ))}
      </List>
    </Stack>
  )
}
