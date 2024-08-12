import { useInstitutionRequests, useDoctors, useNurses, useSpecialties } from '@services/index'
import { doctors as DoctorsFallback, nurse as nurseFallback } from '@src/constants'
import { Doctor, Nurse } from '@src/types'
import InstitutionRequestsView from '@views/InstitutionRequests'
import React, { useMemo } from 'react'

export default function InstitutionRequestsPage() {
  // --- Hooks -----------------------------------------------------------------
  const { data } = useInstitutionRequests()
  const { data: doctors } = useDoctors()
  const { data: nurses } = useNurses()
  const { data: specialties } = useSpecialties()
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const doctorsFiltered = useMemo(() => {
    const onlyDoctors = data?.data.filter((el) => !el.nurseId)
    const doctorsMap =
      onlyDoctors?.map((doctor) => {
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

  const nursesFiltered = useMemo(() => {
    const onlyNurses = data?.data.filter((el) => el.nurseId)
    const nursesMap = onlyNurses?.map((nurse) => {
      const nurseObj = nurses?.data?.find((el) => el.id === nurse.nurseId) ?? nurseFallback

      return {
        ...nurseObj,
        requestId: nurse.id,
        approved: nurse?.approved
      }
    }) ?? [nurseFallback]

    return nursesMap?.filter((el: Nurse) => el.pending && !el.approved)
  }, [data?.data, nurses?.data])

  const specialtiesOptions = specialties?.data?.map((option: { name: string; id: string }) => ({
    value: option.id,
    label: option.name
  }))

  const context = useMemo(
    () => ({
      doctors: doctorsFiltered,
      nurses: nursesFiltered,
      specialtiesOptions: specialtiesOptions ?? []
    }),
    [doctorsFiltered, nursesFiltered, specialtiesOptions]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <InstitutionRequestsView context={context} />
}
