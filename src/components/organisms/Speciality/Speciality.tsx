import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Text,
  Avatar,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator
} from '@chakra-ui/react'
import SearchInputComponent from '@components/atoms/SearchInput'
import EvolutionsList from '@components/molecules/EvolutionsList'
import { isIOS, isMobile } from '@utils/index'
import { useRouter } from 'next/navigation'
import React from 'react'

type Evolution = {
  href: string
  title: string
  description: string
  comment: string
}[]

export default function Speciality({
  speciality,
  data
}: {
  speciality: {
    id: number
    name: string
  }
  data: {
    evolutions: Evolution
    orders: Evolution
    tests: Evolution
  }
}) {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  // --- END: Data and handlers ------------------------------------------------

  return (
    <div
      className={`mx-auto block h-screen w-screen overflow-hidden px-8 lg:w-1/2 ${isIOS() ? 'pt-20' : 'pt-8'}`}
    >
      <div className="mb-8 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start gap-4">
          <IconButton
            size="xl"
            aria-label="back"
            variant="link"
            icon={<ArrowBackIcon />}
            onClick={() => {
              router.push('/especialidades')
            }}
          />
          <Text className="font-medium">{speciality.name}</Text>
        </div>
        <Avatar name={speciality.name} src="/" size="sm" />
      </div>
      {data.evolutions.length > 0 && (
        <SearchInputComponent
          placeholder="Buscar especialidad"
          className="mb-8 w-full"
          onClick={() => {
            router.push(`/especialidad/busqueda/${speciality.id}`)
          }}
        />
      )}
      <Tabs isFitted={!isMobile()} variant="unstyled">
        <TabList>
          <Tab fontSize={isMobile() ? '0.6rem' : '1rem'} width="30%">
            Evoluciones
          </Tab>
          <Tab fontSize={isMobile() ? '0.6rem' : '1rem'} width="40%">
            Ordenes médicas
          </Tab>
          <Tab fontSize={isMobile() ? '0.6rem' : '1rem'} width="30%">
            Análisis
          </Tab>
        </TabList>
        <TabIndicator mt="-1.5px" height="2px" bg="black" borderRadius="1px" />

        <TabPanels>
          <TabPanel>
            <EvolutionsList evolutions={data.evolutions} />
          </TabPanel>
          <TabPanel>
            <EvolutionsList evolutions={data.orders} />
          </TabPanel>
          <TabPanel>
            <EvolutionsList evolutions={data.tests} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}
