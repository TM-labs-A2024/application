import { Heading, Text, Icon } from '@chakra-ui/react'
import DoctorList from '@components/molecules/DoctorsList/DoctorsList'
import { Doctor as DoctorType } from '@src/types'
import { isIOS } from '@utils/index'
import React from 'react'
import { FaUserDoctor } from 'react-icons/fa6'

export default function Doctors({
  context
}: {
  context: { doctors: (DoctorType | undefined)[]; pendingDoctors: (DoctorType | undefined)[] }
}) {
  // --- Local state -----------------------------------------------------------
  const { doctors, pendingDoctors } = context
  // --- END: Local state ------------------------------------------------------

  return (
    <div
      className={`mx-auto block h-screen w-screen overflow-hidden px-8 lg:px-96 ${isIOS() ? 'pb-40 pt-20' : 'pb-32 pt-8'}`}
      data-testid="doctors"
    >
      <Heading as="h2" size="md" mb={4} noOfLines={1}>
        Médicos
      </Heading>
      {(doctors.length > 0 || pendingDoctors.length > 0) && (
        <DoctorList doctors={doctors} pendingDoctors={pendingDoctors} />
      )}
      {doctors.length === 0 && pendingDoctors.length === 0 && (
        <div
          className="flex h-full w-full flex-col items-center justify-center"
          data-testid="doctors-empty-state"
        >
          <Icon fontSize="xxx-large" as={FaUserDoctor} />
          <Text textAlign="center" mt={4}>
            No hay médicos asociados aún.
          </Text>
        </div>
      )}
    </div>
  )
}
