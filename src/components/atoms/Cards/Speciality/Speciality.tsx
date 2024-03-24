import { Box, Text, Avatar } from '@chakra-ui/react'
import React from 'react'

import Chevron from '../../../../../public/static/icons/chevron.svg'

export default function Speciality({ name }: { name: string }) {
  return (
    <Box
      borderRadius="lg"
      borderWidth="2px"
      w="100%"
      padding="0.5rem"
      onClick={() => alert('test')}
      className="cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <Avatar name={name} src="/" />
          <Text>{name}</Text>
        </div>
        <Chevron />
      </div>
    </Box>
  )
}
