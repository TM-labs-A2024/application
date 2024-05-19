import { Link } from '@chakra-ui/react'
import SearchInputComponent from '@components/atoms/SearchInput'
import SpecialitiesList from '@components/molecules/SpecialitiesList'
import { isIOS } from '@utils/index'
import NextLink from 'next/link'
import React, { useCallback, useMemo, useState, useEffect } from 'react'

export default function SpecialitiesSearch({
  context
}: {
  context: {
    specialities: {
      id: number
      name: string
    }[]
    uuid?: string
  }
}) {
  // --- Hooks -----------------------------------------------------------------
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const { uuid, specialities } = context
  const [specialitiesList, setSpecialitiesList] = useState(specialities)
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
  const onChange = useCallback(
    (value: string) => {
      const newList = specialities.filter((speciality) =>
        speciality.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      )

      setSpecialitiesList(newList)
    },
    [specialities]
  )

  const matches = useMemo(() => `${specialitiesList.length} resultados`, [specialitiesList.length])
  // --- END: Data and handlers ------------------------------------------------

  return (
    <div
      className={`mx-auto block h-screen w-screen overflow-hidden px-8 lg:px-96 ${isIOS() ? 'pt-20' : 'pt-8'}`}
    >
      <div className="mb-8 flex flex-row items-center gap-4">
        <SearchInputComponent
          placeholder="Buscar especialidad"
          className="w-full"
          onChange={onChange}
          inputRef={inputRef}
        />
        <Link as={NextLink} href={uuid ? `/especialidades/${uuid}` : '/especialidades'}>
          Cancelar
        </Link>
      </div>
      <SpecialitiesList specialities={specialitiesList} label={matches} />
    </div>
  )
}
