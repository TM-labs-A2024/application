import Institution from '@components/organisms/Institution'
import { Institution as InstitutionType } from '@src/types'
import React, { ReactElement } from 'react'

export default function InstitutionView({
  institution
}: {
  institution: InstitutionType
}): ReactElement {
  return <Institution institution={institution} />
}
