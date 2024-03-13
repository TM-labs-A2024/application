import { List } from '@chakra-ui/react'
import Speciality from '@components/atoms/Cards/Speciality'
import React from 'react'

export default function SpecialitiesList({
  specialities
}: {
  specialities: { name: string; id: number }[]
}) {
  return (
    <List spacing={3}>
      {specialities.map((speciality) => (
        <Speciality name={speciality.name} key={`speciality-${speciality.id}`} />
      ))}
    </List>
  )
}
