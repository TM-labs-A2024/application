import Doctor from '@components/organisms/Doctor'
import React from 'react'

export default function DoctorView({
  doctor
}: {
  doctor: {
    id: number
    firstname: string
    lastname: string
    birthdate: string
    email: string
    phone: string
    speciality: string
  }
}) {
  return <Doctor doctor={doctor} />
}
