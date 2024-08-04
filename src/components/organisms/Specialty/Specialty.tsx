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
  TabIndicator,
  Button,
  Icon
} from '@chakra-ui/react'
import SearchInputComponent from '@components/atoms/SearchInput'
import EvolutionsList from '@components/molecules/EvolutionsList'
import { CardEvolution } from '@src/types'
import { isAndroid, isIOS, isMobile } from '@utils/index'
import { useRouter } from 'next/navigation'
import { useRouter as queryRouter } from 'next/router'
import React, { useState, useEffect, useMemo } from 'react'
import { RiHealthBookFill } from 'react-icons/ri'

export default function Specialty({
  context
}: {
  context: {
    isPatient: boolean
    isDoctor: boolean
    specialty: {
      id: string
      name: string
    }
    data: {
      evolutions: CardEvolution[]
      orders: CardEvolution[]
      tests: CardEvolution[]
    }
    currentTab: number
  }
}) {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  const route = queryRouter()
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const { isPatient, isDoctor, specialty, data, currentTab } = context
  const [_window, setWindow] = useState({ screen: { availWidth: 999 } })
  const [tabIndex, setTabIndex] = useState(currentTab)
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
  const patientId = useMemo(() => !isPatient && route?.query.slug?.[0], [isPatient, route])
  // --- END: Data and handlers ------------------------------------------------

  return (
    <div
      className={`flex h-screen w-screen flex-col p-8 lg:px-96 ${isIOS() ? 'pt-20' : 'pt-8'}`}
      data-testid="specialty"
    >
      <div className="mb-8 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start gap-4">
          <IconButton
            size="xl"
            aria-label="back"
            variant="link"
            icon={<ArrowBackIcon />}
            onClick={() => {
              patientId
                ? router.push(`/especialidades/${patientId}`)
                : router.push('/especialidades')
            }}
          />
          <Text className="font-medium">{specialty.name}</Text>
        </div>
        <Avatar name={specialty.name} src="/" size="sm" />
      </div>
      {data.evolutions.length > 0 && (
        <SearchInputComponent
          placeholder="Buscar"
          className="mb-8 w-full"
          onClick={() => {
            patientId
              ? router.push(`/especialidad/busqueda/${patientId}/${specialty.id}`)
              : router.push(`/especialidad/busqueda/${specialty.id}`)
          }}
        />
      )}
      <Tabs
        isFitted={!isMobile(_window)}
        variant="unstyled"
        className="h-[80%]"
        defaultIndex={currentTab}
        onChange={(index) => setTabIndex(index)}
      >
        <TabList>
          {(isPatient || isDoctor) && (
            <Tab fontSize={isMobile(_window) ? '0.8rem' : '1rem'} width="25%">
              Evoluciones
            </Tab>
          )}
          <Tab fontSize={isMobile(_window) ? '0.8rem' : '1rem'} width="50%">
            Ordenes médicas
          </Tab>
          {(isPatient || isDoctor) && (
            <Tab fontSize={isMobile(_window) ? '0.8rem' : '1rem'} width="25%">
              Análisis
            </Tab>
          )}
        </TabList>
        <TabIndicator mt="-1.5px" height="2px" bg="black" borderRadius="1px" />

        <TabPanels className="h-full pb-0">
          {(isPatient || isDoctor) && (
            <TabPanel className={`${isAndroid() ? 'h-[75%]' : 'h-[90%]'} overflow-scroll`}>
              <EvolutionsList evolutions={data.evolutions} />
            </TabPanel>
          )}
          <TabPanel className={`${isAndroid() ? 'h-[75%]' : 'h-[90%]'} overflow-scroll`}>
            {data.orders.length > 0 && <EvolutionsList evolutions={data.orders} />}
            {data.orders.length === 0 && (
              <div
                className="flex h-full w-full items-center justify-center"
                data-testid="orders-empty-state"
              >
                <Icon fontSize="xxx-large" as={RiHealthBookFill} />
                <Text textAlign="center" mt={4}>
                  No hay órdenes asociadas aún.
                </Text>
                {isDoctor && (
                  <Button
                    mt={4}
                    onClick={() =>
                      router.push(`/crear-adjunto/${patientId}/${specialty.id}?type=order`)
                    }
                  >
                    Nueva orden
                  </Button>
                )}
              </div>
            )}
          </TabPanel>
          {(isPatient || isDoctor) && (
            <TabPanel className={`${isAndroid() ? 'h-[75%]' : 'h-[90%]'} overflow-scroll`}>
              {data.tests.length > 0 && <EvolutionsList evolutions={data.tests} />}
              {data.tests.length === 0 && (
                <div
                  className="flex h-full w-full items-center justify-center"
                  data-testid="tests-empty-state"
                >
                  <Icon fontSize="xxx-large" as={RiHealthBookFill} />
                  <Text textAlign="center" mt={4}>
                    No hay análisis asociados aún.
                  </Text>
                  <Button
                    mt={4}
                    onClick={() =>
                      router.push(`/crear-adjunto/${patientId}/${specialty.id}?type=order`)
                    }
                  >
                    Nuevo análisis
                  </Button>
                </div>
              )}
            </TabPanel>
          )}
          {isDoctor && tabIndex === 0 && (
            <Button
              className="mt-4 w-full"
              onClick={() => router.push(`/crear-historia/${patientId}`)}
            >
              Nueva evolución
            </Button>
          )}
          {isDoctor && tabIndex === 1 && (
            <Button
              className="mt-4 w-full"
              onClick={() => router.push(`/crear-adjunto/${patientId}/${specialty.id}?type=order`)}
            >
              Nueva orden
            </Button>
          )}
          {isDoctor && tabIndex === 2 && (
            <Button
              className="mt-4 w-full"
              onClick={() => router.push(`/crear-adjunto/${patientId}/${specialty.id}?type=test`)}
            >
              Nuevo análisis
            </Button>
          )}
        </TabPanels>
      </Tabs>
    </div>
  )
}
