import { Link, Button, Text } from '@chakra-ui/react'
import SearchInputComponent from '@components/atoms/SearchInput'
import EvolutionList from '@components/molecules/EvolutionsList'
import { Evolution } from '@src/types'
import { isIOS } from '@utils/index'
import NextLink from 'next/link'
import React, { useEffect } from 'react'

import Swimmer from '../../../../../public/static/icons/Swimmer.svg'

export default function SpecialitySearch({
  context
}: {
  context: {
    speciality: string | string[] | undefined
    onChange: (value: string) => void
    data: {
      evolutions: Evolution
      orders: Evolution
      tests: Evolution
    }
    matches: string
  }
}) {
  // --- Hooks -----------------------------------------------------------------
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  const inputRef = React.createRef<HTMLInputElement>()
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputRef])
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  // --- END: Data and handlers ------------------------------------------------

  return (
    <div
      className={`relative mx-auto block h-screen w-screen overflow-hidden px-8 lg:w-1/2 ${isIOS() ? 'pt-20' : 'pt-8'}`}
    >
      <div className="mb-8 flex flex-row items-center gap-4">
        <SearchInputComponent
          placeholder="ingresar criterio"
          className="w-full"
          onChange={context.onChange}
          inputRef={inputRef}
        />
        <Link as={NextLink} href={`/especialidad/${context.speciality}`}>
          Cancelar
        </Link>
      </div>
      <div className="h-5/6 overflow-scroll">
        <div className="block">
          <Text>Evoluciones</Text>
          <EvolutionList evolutions={context.data.evolutions} />
        </div>
        <div className="block">
          <Text>Ordenes</Text>
          <EvolutionList evolutions={context.data.orders} />
        </div>
        <div className="block">
          <Text>Análisis</Text>
          <EvolutionList evolutions={context.data.tests} />
        </div>
      </div>
      <div className="absolute bottom-4 w-full pr-16">
        <Button className="w-full gap-2">
          <Swimmer /> Filtros
        </Button>
      </div>
    </div>
  )
}
