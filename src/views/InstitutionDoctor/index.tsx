import InstitutionDoctor from '@components/organisms/InstitutionDoctor'
import { Doctor as DoctorType } from '@src/types'
import React, { ReactElement } from 'react'

export default function InstitutionDoctorView({ doctor }: { doctor: DoctorType }): ReactElement {
  return <InstitutionDoctor doctor={doctor} />
}
