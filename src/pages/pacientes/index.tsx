import { getSession, getUser } from '@shared/index'
import Splash from '@src/components/atoms/Splash'
import { useDoctorPatients, useInstitutionPatients, useApprovedInstitutions } from '@src/services'
import { formatDate } from '@src/utils'
import PatientsView from '@views/Patients'
import { formatDistanceToNowStrict } from 'date-fns'
import { es } from 'date-fns/locale/es'
import React, { useMemo } from 'react'

const fallback = [
  {
    href: '',
    title: '',
    description: '',
    status: '',
    pending: false
  }
]

export default function PatientsPage() {
  // --- Hooks -----------------------------------------------------------------
  const user = useMemo(() => getUser(), [])

  const { data, isLoading } = useDoctorPatients(user?.id)
  const { data: allPatients } = useInstitutionPatients()
  const { data: institutionsData } = useApprovedInstitutions()
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const isDoctor = useMemo(() => getSession() === 'doctor', [])

  const patientsData = useMemo(
    () => (isDoctor ? data?.data : allPatients?.data),
    [allPatients, data, isDoctor]
  )

  const patientsFormatted = useMemo(
    () =>
      patientsData?.map(
        ({ birthdate, govId, status, bed, firstname, lastname, pending, institution_id }) => ({
          href: pending ? '/pacientes' : `/especialidades/${govId}`,
          title: `${firstname} ${lastname}`,
          description: `C.I: ${govId}, ${formatDistanceToNowStrict(
            new Date(formatDate(birthdate)),
            {
              locale: es,
              roundingMethod: 'floor'
            }
          )}${status == 'hospitalizado' ? `, Cama: ${bed}` : ''}`,
          status,
          pending,
          hospitalizationPlace: institutionsData?.data?.find((el) => el.id === institution_id)?.name
        })
      ) ?? fallback,
    [patientsData, institutionsData?.data]
  )

  const pendingPatients = useMemo(
    () => patientsFormatted?.filter((patient) => patient.pending) ?? [],
    [patientsFormatted]
  )

  const approvedPatients = useMemo(
    () => patientsFormatted?.filter((patient) => !patient.pending) ?? [],
    [patientsFormatted]
  )

  const hospitalizedPatients = useMemo(
    () =>
      patientsFormatted?.filter(
        (patient) => !patient.pending && patient?.status === 'hospitalizado'
      ),
    [patientsFormatted]
  )

  const context = useMemo(
    () => ({
      pendingPatients: isDoctor ? pendingPatients : [],
      approvedPatients: isDoctor ? approvedPatients : hospitalizedPatients,
      isDoctor
    }),
    [isDoctor, pendingPatients, approvedPatients, hospitalizedPatients]
  )
  // --- END: Data and handlers ------------------------------------------------

  return isLoading ? <Splash /> : <PatientsView context={context} />
}
