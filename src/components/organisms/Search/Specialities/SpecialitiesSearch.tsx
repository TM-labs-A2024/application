import { Link } from '@chakra-ui/react'
import SearchInputComponent from '@components/atoms/SearchInput'
import SpecialitiesList from '@components/molecules/SpecialitiesList'
import { isIOS } from '@utils/index'
import NextLink from 'next/link'
import React, { useEffect } from 'react'

export default function SpecialitiesSearch({
  context
}: {
  context: {
    onChange: (value: string) => void
    specialities: {
      id: number
      name: string
    }[]
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
      className={`mx-auto block h-screen w-screen overflow-hidden px-8 lg:w-1/2 ${isIOS() ? 'pt-20' : 'pt-8'}`}
    >
      <div className="mb-8 flex flex-row items-center gap-4">
        <SearchInputComponent
          placeholder="Buscar especialidad"
          className="w-full"
          onChange={context.onChange}
          inputRef={inputRef}
        />
        <Link as={NextLink} href="/especialidades">
          Cancelar
        </Link>
      </div>
      <SpecialitiesList specialities={context.specialities} label={context.matches} />
    </div>
  )
}
