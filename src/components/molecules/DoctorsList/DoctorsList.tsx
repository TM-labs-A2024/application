import { StackDivider, Stack, Text } from '@chakra-ui/react'
import Doctor from '@components/atoms/Cards/Doctor'
import { Doctor as DoctorType } from '@src/types'
import React from 'react'

export default function DoctorList({
  doctors,
  pendingDoctors
}: {
  doctors: DoctorType[]
  pendingDoctors: DoctorType[]
}) {
  return (
    <Stack divider={<StackDivider />} spacing="4" className="h-full">
      <div className="overflow-auto">
        {pendingDoctors.length > 0 && (
          <>
            <Text size="sm" noOfLines={1} className="my-4">
              Pendientes
            </Text>
            <Stack divider={<StackDivider />} spacing="4">
              {pendingDoctors.map((doctor) => (
                <Doctor doctor={doctor} key={`doctor-${doctor.id}`} />
              ))}
            </Stack>
          </>
        )}
        {doctors.length > 0 && (
          <>
            {pendingDoctors.length > 0 && (
              <Text size="sm" noOfLines={1} className="my-4">
                Todos
              </Text>
            )}
            <Stack divider={<StackDivider />} spacing="4">
              {doctors?.map((doctor) => <Doctor doctor={doctor} key={`doctor-${doctor.id}`} />)}
            </Stack>
          </>
        )}
      </div>
    </Stack>
  )
}
