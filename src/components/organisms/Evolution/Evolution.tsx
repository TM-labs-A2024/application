import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from '@chakra-ui/react'
import { isIOS } from '@utils/index'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Evolution({
  speciality,
  title,
  data
}: {
  speciality: string
  title: string
  data: {
    title: string
    content: string
  }[]
}) {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  // --- END: Hooks ------------------------------------------------------------

  return (
    <div className={`flex h-screen w-screen flex-col p-8 lg:px-96 ${isIOS() ? 'pt-20' : 'pt-8'}`}>
      <div className="mb-8 flex flex-row items-center justify-start gap-4">
        <IconButton
          size="xl"
          aria-label="back"
          variant="link"
          icon={<ArrowBackIcon />}
          onClick={() => {
            router.push(`/especialidad/${speciality}?type=evolution`)
          }}
        />
        <Text className="font-medium">{title}</Text>
      </div>
      <div className="flex h-full flex-col overflow-scroll">
        <Accordion defaultIndex={[]} allowMultiple>
          {data?.map((item, idx) => (
            <AccordionItem key={`evolution-item-${idx + 1}`}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {item.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{item.content}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}