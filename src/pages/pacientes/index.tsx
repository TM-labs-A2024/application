import { patients } from '@src/constants'
import { getSession } from '@src/shared'
import PatientsView from '@views/Patients'
import { formatDistanceToNowStrict } from 'date-fns'
import { es } from 'date-fns/locale/es'
import React, { useMemo } from 'react'

export default function PatientsPage() {
  // --- Data and handlers -----------------------------------------------------
  const isDoctor = useMemo(() => getSession() === 'doctor', [])

  const patientsFormatted = useMemo(
    () =>
      patients.map(({ id, birthdate, govId, status, bed, firstname, lastname, pending }) => ({
        href: pending ? '/pacientes' : `/especialidades/${id}`,
        title: `${firstname} ${lastname}`,
        description: `C.I: ${govId}, ${formatDistanceToNowStrict(new Date(birthdate), {
          locale: es,
          roundingMethod: 'floor'
        })}${status ? `, Cama: ${bed}` : ''}`,
        status,
        pending
      })),
    []
  )

  const pendingPatients = useMemo(
    () => patientsFormatted.filter((patient) => patient.pending),
    [patientsFormatted]
  )

  const approvedPatients = useMemo(
    () => patientsFormatted.filter((patient) => !patient.pending),
    [patientsFormatted]
  )

  const hospitalizedPatients = useMemo(
    () =>
      patientsFormatted.filter(
        (patient) => !patient.pending && patient?.status === 'hospitalizado'
      ),
    [patientsFormatted]
  )

  const context = useMemo(
    () => ({
      pendingPatients: isDoctor ? pendingPatients : [],
      approvedPatients: isDoctor ? approvedPatients : hospitalizedPatients
    }),
    [isDoctor, pendingPatients, approvedPatients, hospitalizedPatients]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <PatientsView context={context} />
}
