import Splash from '@components/atoms/Splash'
import { nurse } from '@constants/index'
import { getUser } from '@shared/index'
import { useNurseById } from '@src/services'
import NurseProfileView from '@src/views/NurseProfile'
import React from 'react'

export default function Nurserofile() {
  // --- Hooks -----------------------------------------------------------------
  const user = getUser()

  const { data, isLoading } = useNurseById(user?.id)
  // --- END: Hooks ------------------------------------------------------------

  return isLoading ? <Splash /> : <NurseProfileView nurse={data?.data ?? nurse} />
}
