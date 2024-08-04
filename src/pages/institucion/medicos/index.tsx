import { doctors as DoctorsFallback } from '@constants/index'
import { getUser } from '@shared/index'
import { useInstitutionDoctors, useSpecialties } from '@src/services'
import InstitutionDoctorsView from '@views/InstitutionDoctors'
import React, { useMemo } from 'react'

export default function InstitutionDoctorsPage() {
  // --- Hooks -----------------------------------------------------------------
  const user = getUser()

  const { data } = useInstitutionDoctors(user?.institutionId)
  const { data: specialties } = useSpecialties()
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const doctorsFiltered = useMemo(
    () =>
      data?.data.map((doctor) => {
        return {
          ...doctor,
          specialties: doctor.specialities?.map((el) => el.id) ?? []
        }
      }) ?? DoctorsFallback,
    [data]
  )

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

  return <InstitutionDoctorsView context={context} />
}
