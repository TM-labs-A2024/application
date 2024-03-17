import { StackDivider, Stack } from '@chakra-ui/react'
import Doctor from '@components/atoms/Cards/Doctor'
import React from 'react'

export default function DoctorList({
  doctors
}: {
  doctors: { name: string; id: number; speciality: string }[]
}) {
  return (
    <Stack divider={<StackDivider />} spacing="4" className="h-full overflow-scroll">
      {doctors.map((doctor) => (
        <Doctor doctor={doctor} key={`doctor-${doctor.id}`} />
      ))}
    </Stack>
  )
}
