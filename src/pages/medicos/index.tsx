import { doctors as DoctorsFallback } from '@src/constants'
import { usePatientAccessRequest, useDoctors } from '@src/services'
import DoctorsView from '@views/Doctors'
import React, { useMemo } from 'react'

export default function Medicos() {
  // --- Hooks -----------------------------------------------------------------
  const { data } = usePatientAccessRequest()
  const { data: doctors } = useDoctors()
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const doctorsFiltered = useMemo(
    () =>
      data?.data.map((doctor) => {
        const doctorObj =
          doctors?.data.find((el) => el.id === doctor.doctorId) ?? DoctorsFallback[0]

        return {
          ...doctorObj,
          requestId: doctor.id
        }
      }),
    [doctors, data]
  )

  const pendingDoctors = useMemo(
    () => doctorsFiltered?.filter((doctor) => doctor?.patientPending) ?? [],
    [doctorsFiltered]
  )

  const approvedDoctors = useMemo(
    () => doctorsFiltered?.filter((doctor) => !doctor?.patientPending) ?? [],
    [doctorsFiltered]
  )

  const context = useMemo(
    () => ({
      pendingDoctors,
      doctors: approvedDoctors
    }),
    [pendingDoctors, approvedDoctors]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <DoctorsView context={context} />
}
