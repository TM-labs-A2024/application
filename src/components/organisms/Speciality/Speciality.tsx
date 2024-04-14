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
import { Evolution } from '@src/types'
import { isIOS, isMobile } from '@utils/index'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

export default function Speciality({
  speciality,
  data,
  currentTab
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
  currentTab: number
}) {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [_window, setWindow] = useState({ screen: { availWidth: 999 } })
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  useEffect(() => {
    setWindow(window)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  // --- END: Data and handlers ------------------------------------------------

  return (
    <div className={`flex h-screen w-screen flex-col p-8 lg:px-96 ${isIOS() ? 'pt-20' : 'pt-8'}`}>
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
      <Tabs
        isFitted={!isMobile(_window)}
        variant="unstyled"
        className="h-[80%]"
        defaultIndex={currentTab}
      >
        <TabList>
          <Tab fontSize={isMobile(_window) ? '0.8rem' : '1rem'} width="25%">
            Evoluciones
          </Tab>
          <Tab fontSize={isMobile(_window) ? '0.8rem' : '1rem'} width="50%">
            Ordenes médicas
          </Tab>
          <Tab fontSize={isMobile(_window) ? '0.8rem' : '1rem'} width="25%">
            Análisis
          </Tab>
        </TabList>
        <TabIndicator mt="-1.5px" height="2px" bg="black" borderRadius="1px" />

        <TabPanels className="h-full pb-0">
          <TabPanel className="h-full overflow-scroll">
            <EvolutionsList evolutions={data.evolutions} />
          </TabPanel>
          <TabPanel className="h-full overflow-scroll">
            {data.orders.length > 0 && <EvolutionsList evolutions={data.orders} />}
            {data.orders.length === 0 && (
              <div className="flex h-full w-full items-center justify-center">
                <Text>No hay ordenes disponibles</Text>
              </div>
            )}
          </TabPanel>
          <TabPanel className="h-full overflow-scroll">
            {data.tests.length > 0 && <EvolutionsList evolutions={data.tests} />}
            {data.tests.length === 0 && (
              <div className="flex h-full w-full items-center justify-center">
                <Text>No hay análisis disponibles</Text>
              </div>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}
