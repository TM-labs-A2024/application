import { Text, Button } from '@chakra-ui/react'
import { isIOS } from '@utils/index'
import Image from 'next/image'
import React from 'react'

import Logo from '../../../../public/static/icons/logo.svg'

export default function PendingDoctor({ onClick }: { onClick: () => void }) {
  return (
    <div
      className={`flex h-screen w-screen flex-col items-center p-8 lg:px-96 ${isIOS() ? 'pt-20' : 'pt-8'}`}
      data-testid="pending-doctor"
    >
      <Image
        alt="logo"
        src="/static/images/logo-horizontal.png"
        width={200}
        height={80}
        className="mx-auto mb-8"
      />
      <div className="flex h-full flex-col items-center justify-center">
        <Logo />
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
