import { Box, Text } from '@chakra-ui/react'
import React from 'react'

import Chevron from '../../../../../public/static/icons/chevron.svg'

export default function Doctor({
  doctor
}: {
  doctor: { name: string; id: number; speciality: string }
}) {
  return (
    <Box w="100%" padding="0.5rem" onClick={() => alert('test')} className="cursor-pointer">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col items-start gap-1">
          <Text>{doctor.name}</Text>
          <div className="flex flex-row items-center gap-4">
            <Text>CI: {doctor.id.toLocaleString('es-ES')}</Text>
            <Text>{doctor.speciality}</Text>
          </div>
        </div>
        <Chevron />
      </div>
    </Box>
  )
}
