import { Text, Button, Icon } from '@chakra-ui/react'
import { isIOS } from '@utils/index'
import React from 'react'
import { RiPassPendingFill } from 'react-icons/ri'

import Logo from '../../../../public/static/icons/logo.svg'

export default function PendingDoctor({ onClick }: { onClick: () => void }) {
  return (
    <div
      className={`flex h-screen w-screen flex-col items-center p-8 lg:px-96 ${isIOS() ? 'pt-20' : 'pt-8'}`}
      data-testid="pending-doctor"
    >
      <Logo className="mx-auto mb-8" />
      <div className="flex h-full flex-col items-center justify-center">
        <Icon fontSize="xxx-large" as={RiPassPendingFill} />
        <Text as="b" mt={4}>
          Aprobación pendiente
        </Text>
        <Text textAlign="center">
          Su cuenta está bajo revisión, cuando sea aprobada podrá iniciar sesión.
        </Text>
      </div>
      <Button colorScheme="blackAlpha" onClick={onClick}>
        OK
      </Button>
    </div>
  )
}
