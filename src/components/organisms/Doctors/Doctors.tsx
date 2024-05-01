import { Heading, Text } from '@chakra-ui/react'
import DoctorList from '@components/molecules/DoctorsList/DoctorsList'
import { doctors } from '@constants/index'
import { isIOS } from '@utils/index'
import React from 'react'

import Logo from '../../../../public/static/icons/logo.svg'

export default function Doctors() {
  return (
    <div
      className={`mx-auto block h-screen w-screen overflow-hidden px-8 lg:px-96 ${isIOS() ? 'pb-40 pt-20' : 'pb-32 pt-8'}`}
    >
      <Heading as="h2" size="lg" mb={4} noOfLines={1}>
        Medicos con acceso
      </Heading>
      {doctors.length > 0 && <DoctorList doctors={doctors} />}
      {doctors.length === 0 && (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <Logo />
          <Text textAlign="center" mt={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis porttitor leo diam
            risus vel elementum in vulputate.
          </Text>
        </div>
      )}
    </div>
  )
}
