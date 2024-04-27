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
          birthdate,
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
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
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
      filteredPatientsList = filteredPatientsList.filter((patient) =>
        patient.gender.toLocaleLowerCase().includes(String(gender?.value))
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
    if (fromDate !== '') {
      const formattedFromDate = new Date(fromDate).getTime()

      filteredPatientsList = filteredPatientsList.filter(
        (patient) => new Date(patient.birthdate).getTime() >= formattedFromDate
      )
    }

    if (toDate !== '') {
      const formattedToDate = new Date(toDate).getTime()

      filteredPatientsList = filteredPatientsList.filter(
        (patient) => new Date(patient.birthdate).getTime() <= formattedToDate
      )
    }

    setPatientsList(filteredPatientsList)
  }, [approvedPatients, fromDate, gender?.value, search, toDate])
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
      fromDate,
      toDate,
      gender,
      status,
      speciality,
      setFromDate,
      setToDate,
      setGender,
      setStatus,
      setSpeciality
    }),
    [fromDate, gender, onChange, patientsList, speciality, status, toDate]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <PatientsSearchView context={context} />
}
