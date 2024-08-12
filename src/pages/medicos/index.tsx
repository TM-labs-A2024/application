import { usePatientAccessRequest, useDoctors, useSpecialties } from '@src/services'
import DoctorsView from '@views/Doctors'
import React, { useMemo } from 'react'

export default function Medicos() {
  // --- Hooks -----------------------------------------------------------------
  const { data } = usePatientAccessRequest()
  const { data: doctors } = useDoctors()
  const { data: specialtiesData } = useSpecialties()
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const doctorsFiltered = useMemo(
    () =>
      data?.data && doctors?.data
        ? data?.data.map((doctor) => {
            const doctorObj = doctors.data.find((el) => el.id === doctor.doctorId)

            return {
              ...doctorObj,
              id: doctorObj?.id ?? '',
              institutionId: doctorObj?.institutionId ?? '',
              firstname: doctorObj?.firstname ?? '',
              lastname: doctorObj?.lastname ?? '',
              birthdate: doctorObj?.birthdate ?? '',
              email: doctorObj?.email ?? '',
              govId: doctorObj?.govId ?? '',
              phoneNumber: doctorObj?.phoneNumber ?? '',
              credentials: doctorObj?.credentials ?? '',
              specialties: doctorObj?.specialties ?? [],
              requestId: doctor.id,
              approved: doctor.approved
            }
          })
        : [],
    [doctors, data]
  )

  const pendingDoctors = useMemo(
    () => doctorsFiltered?.filter((doctor) => doctor?.patientPending) ?? [],
    [doctorsFiltered]
  )

  const approvedDoctors = useMemo(
    () => doctorsFiltered?.filter((doctor) => !doctor?.patientPending && doctor.approved) ?? [],
    [doctorsFiltered]
  )

  const specialtiesOptions = specialtiesData?.data?.map((option: { name: string; id: string }) => ({
    value: option.id,
    label: option.name
  }))

  const context = useMemo(
    () => ({
      pendingDoctors,
      doctors: approvedDoctors,
      specialties: specialtiesOptions ?? []
    }),
    [pendingDoctors, approvedDoctors, specialtiesOptions]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <DoctorsView context={context} />
}
