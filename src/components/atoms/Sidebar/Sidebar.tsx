import { ChevronLeftIcon } from '@chakra-ui/icons'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'

export default function Sidebar({
  isOpen,
  onClose,
  children,
  innerRef
}: {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  innerRef: React.RefObject<HTMLButtonElement>
}) {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={innerRef}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>HealthCore</DrawerHeader>

        <DrawerBody>{children}</DrawerBody>

        <DrawerFooter>
          <IconButton
            size="xl"
            fontSize="30px"
            aria-label="back"
            variant="link"
            icon={<ChevronLeftIcon />}
            onClick={onClose}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
