import InstitutionDoctors from '@components/organisms/InstitutionDoctors'
import { Doctor as DoctorType } from '@src/types'
import React from 'react'

export default function InstitutionDoctorsView({ doctors }: { doctors: DoctorType[] }) {
  return <InstitutionDoctors doctors={doctors} />
}
