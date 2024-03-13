import { Box, Text, Avatar } from '@chakra-ui/react'
import React from 'react'

export default function Speciality({ name }: { name: string }) {
  return (
    <Box borderRadius="lg" borderWidth="2px" maxW="md" padding="0.5rem">
      <div className="flex flex-row items-center justify-between">
        <Avatar name={name} src="/" />
        <Text>{name}</Text>
      </div>
    </Box>
  )
}
