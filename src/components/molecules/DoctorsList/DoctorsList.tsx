import { StackDivider, Stack, Text } from '@chakra-ui/react'
import Doctor from '@components/atoms/Cards/Doctor'
import { Doctor as DoctorType, ReactSelectOption } from '@src/types'
import React from 'react'

export default function DoctorsList({
  doctors,
  pendingDoctors,
  specialties
}: {
  doctors: (DoctorType | undefined)[]
  pendingDoctors: (DoctorType | undefined)[]
  specialties: ReactSelectOption[]
}) {
  return (
    <Stack divider={<StackDivider />} spacing="4" className="h-full" data-testid="doctors-list">
      <div className="overflow-auto">
        {pendingDoctors.length > 0 && (
          <>
            <Text size="sm" noOfLines={1} className="my-4">
              Pendientes
            </Text>
            <Stack divider={<StackDivider />} spacing="4" data-testid="pending-doctors-list">
              {pendingDoctors.map(
                (doctor) =>
                  doctor && (
                    <Doctor
                      doctor={doctor}
                      key={`pending-doctor-${doctor.id}`}
                      specialties={specialties}
                    />
                  )
              )}
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
            <Stack divider={<StackDivider />} spacing="4" data-testid="approved-doctors-list">
              {doctors?.map(
                (doctor) =>
                  doctor && (
                    <Doctor
                      doctor={doctor}
                      key={`pending-doctor-${doctor.id}`}
                      specialties={specialties}
                    />
                  )
              )}
            </Stack>
          </>
        )}
      </div>
    </Stack>
  )
}
