import { Link } from '@chakra-ui/react'
import SearchInputComponent from '@components/atoms/SearchInput'
import SpecialitiesList from '@components/molecules/SpecialitiesList'
import { Patient } from '@src/types'
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
    patient?: Patient
  }
}) {
  // --- Hooks -----------------------------------------------------------------
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const { patient, specialities } = context
  // eslint-disable-next-line no-console
  console.log('patient?.uuid', patient?.uuid)
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
      data-testid="specialities-search"
    >
      <div className="mb-8 flex flex-row items-center">
        <SearchInputComponent
          placeholder="Buscar especialidad"
          className="mr-4 w-full"
          onChange={onChange}
          inputRef={inputRef}
        />
        <Link
          as={NextLink}
          href={patient?.uuid ? `/especialidades/${patient?.uuid}` : '/especialidades'}
        >
          Cancelar
        </Link>
      </div>
      <SpecialitiesList specialities={specialitiesList} label={matches} patient={patient} />
    </div>
  )
}
