import { patients } from '@src/constants'
import { ReactSelectOption } from '@src/types'
import PatientsSearchView from '@views/Patients/Search'
import { formatDistanceToNowStrict } from 'date-fns'
import { es } from 'date-fns/locale/es'
import React, { useCallback, useMemo, useState, useEffect } from 'react'

export default function PatientsSearchPage() {
  // --- Hooks -----------------------------------------------------------------
  // --- END: Hooks ------------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const patientsFormatted = useMemo(
    () =>
      patients.map(
        ({
          uuid,
          birthdate,
          govId,
          status,
          bed,
          firstname,
          lastname,
          pending,
          gender,
          specialities
        }) => ({
          href: pending ? '/pacientes' : `/paciente/${uuid}`,
          title: `${firstname} ${lastname}`,
          description: `C.I: ${govId}, ${formatDistanceToNowStrict(new Date(birthdate), {
            locale: es,
            roundingMethod: 'floor'
          })}${status ? `, Cama: ${bed}` : ''}`,
          status,
          pending,
          gender,
          age: formatDistanceToNowStrict(new Date(birthdate), {
            locale: es,
            roundingMethod: 'floor'
          }).split(' ')[0],
          bed,
          specialities
        })
      ),
    []
  )

  const approvedPatients = useMemo(
    () => patientsFormatted.filter((patient) => !patient.pending),
    [patientsFormatted]
  )
  // --- END: Data and handlers ------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [patientsList, setPatientsList] = useState(approvedPatients)
  const [search, setSearch] = useState('')
  const [fromAge, setFromAge] = useState('')
  const [toAge, setToAge] = useState('')
  const [gender, setGender] = useState<ReactSelectOption>({
    value: 0,
    label: ''
  })
  const [status, setStatus] = useState<ReactSelectOption>({
    value: 0,
    label: ''
  })
  const [speciality, setSpeciality] = useState<ReactSelectOption>({
    value: null,
    label: ''
  })
  // --- END: Local state ------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  useEffect(() => {
    let filteredPatientsList = approvedPatients

    // Title filtering
    if (search !== '') {
      filteredPatientsList = filteredPatientsList.filter(
        (patient) =>
          patient.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
          patient.description.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    }

    // Gender filtering
    if (gender?.value) {
      filteredPatientsList = filteredPatientsList.filter(
        (patient) => patient.gender === gender?.value
      )
    }

    // Status filtering
    if (status?.label) {
      filteredPatientsList = filteredPatientsList.filter((patient) => patient?.bed)
    }

    // speciality filtering
    if (speciality?.value) {
      filteredPatientsList = filteredPatientsList.filter((patient) =>
        patient.specialities.includes(Number(speciality?.value))
      )
    }

    // Dates filtering
    if (fromAge !== '') {
      filteredPatientsList = filteredPatientsList.filter(
        (patient) => Number(patient.age) >= Number(fromAge)
      )
    }

    if (toAge !== '') {
      filteredPatientsList = filteredPatientsList.filter(
        (patient) => Number(patient.age) <= Number(toAge)
      )
    }

    setPatientsList(filteredPatientsList)
  }, [approvedPatients, gender?.value, search, status?.label, speciality?.value, fromAge, toAge])
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const onChange = useCallback((value: string) => {
    setSearch(value)
  }, [])

  const context = useMemo(
    () => ({
      patients: patientsList,
      onChange,
      matches: `${patientsList.length} resultados`,
      fromAge,
      toAge,
      gender,
      status,
      speciality,
      setFromAge,
      setToAge,
      setGender,
      setStatus,
      setSpeciality
    }),
    [fromAge, gender, onChange, patientsList, speciality, status, toAge]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <PatientsSearchView context={context} />
}
