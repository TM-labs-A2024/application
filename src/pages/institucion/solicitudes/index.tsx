import { useInstitutionRequests, useDoctors, useSpecialties } from '@services/index'
import { doctors as DoctorsFallback } from '@src/constants'
import { Doctor } from '@src/types'
import InstitutionRequestsView from '@views/InstitutionRequests'
import React, { useMemo } from 'react'

export default function InstitutionRequestsPage() {
  // --- Hooks -----------------------------------------------------------------
  const { data } = useInstitutionRequests()
  const { data: doctors } = useDoctors()
  const { data: specialties } = useSpecialties()
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const doctorsFiltered = useMemo(() => {
    const doctorsMap =
      data?.data.map((doctor) => {
        const doctorObj =
          doctors?.data?.find((el) => el.id === doctor.doctorId) ?? DoctorsFallback[0]

        return {
          ...doctorObj,
          requestId: doctor.id,
          approved: doctor?.approved
        }
      }) ?? DoctorsFallback

    return doctorsMap.filter((el: Doctor) => el.pending && !el.approved)
  }, [doctors, data])

  const specialtiesOptions = specialties?.data?.map((option: { name: string; id: string }) => ({
    value: option.id,
    label: option.name
  }))

  const context = useMemo(
    () => ({
      doctors: doctorsFiltered,
      specialtiesOptions: specialtiesOptions ?? []
    }),
    [doctorsFiltered, specialtiesOptions]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <InstitutionRequestsView context={context} />
}
