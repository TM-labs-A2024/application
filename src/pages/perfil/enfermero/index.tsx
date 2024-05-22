import { nurse } from '@constants/index'
import NurseProfileView from '@src/views/NurseProfile'
import React from 'react'

export default function Nurserofile() {
  return <NurseProfileView nurse={nurse} />
}
