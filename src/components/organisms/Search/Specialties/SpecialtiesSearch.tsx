import { Link } from '@chakra-ui/react'
import SearchInputComponent from '@components/atoms/SearchInput'
import SpecialtiesList from '@components/molecules/SpecialtiesList'
import { Patient } from '@src/types'
import { isIOS } from '@utils/index'
import NextLink from 'next/link'
import React, { useCallback, useMemo, useState, useEffect } from 'react'

export default function SpecialtiesSearch({
  context
}: {
  context: {
    specialties: {
      id: string
      name: string
    }[]
    patient?: Patient
  }
}) {
  // --- Hooks -----------------------------------------------------------------
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const { patient, specialties } = context

  const [specialtiesList, setSpecialtiesList] = useState(specialties)
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
      const newList = specialties.filter((specialty) =>
        specialty.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      )

      setSpecialtiesList(newList)
    },
    [specialties]
  )

  const matches = useMemo(() => `${specialtiesList.length} resultados`, [specialtiesList.length])
  // --- END: Data and handlers ------------------------------------------------

  return (
    <div
      className={`mx-auto block h-screen w-screen overflow-hidden px-8 lg:px-96 ${isIOS() ? 'pt-20' : 'pt-8'}`}
      data-testid="specialties-search"
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
          href={patient?.govId ? `/especialidades/${patient?.govId}` : '/especialidades'}
        >
          Cancelar
        </Link>
      </div>
      <SpecialtiesList specialties={specialtiesList} label={matches} patient={patient} />
    </div>
  )
}
