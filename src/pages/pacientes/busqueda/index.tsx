import { specialities } from '@src/constants'
import PatientsSearchView from '@views/Patients/Search'
import React, { useCallback, useMemo, useState } from 'react'

export default function PatientsSearchPage() {
  // --- Hooks -----------------------------------------------------------------
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [specialitiesList, setSpecialitiesList] = useState(specialities)
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const onChange = useCallback((value: string) => {
    const newList = specialities.filter((speciality) =>
      speciality.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    )

    setSpecialitiesList(newList)
  }, [])

  const context = useMemo(
    () => ({
      specialities: specialitiesList,
      onChange,
      matches: `${specialitiesList.length} resultados`
    }),
    [onChange, specialitiesList]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <PatientsSearchView context={context} />
}
