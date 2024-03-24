import PatientView from '@components/organisms/Patient'
import { patient } from '@constants/index'
import Layout from '@layouts/index'
import React from 'react'

export default function Patient() {
  return (
    <Layout>
      <PatientView patient={patient} />
    </Layout>
  )
}
