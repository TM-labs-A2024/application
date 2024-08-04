import Splash from '@components/atoms/Splash'
import { institution } from '@constants/index'
import { useInstitutionById } from '@services/index'
import { getUser } from '@shared/index'
import InstitutionProfileView from '@views/InstitutionProfile'
import React from 'react'

export default function InstitutionProfilePage() {
  // --- Hooks -----------------------------------------------------------------
  const user = getUser()

  const { data, isLoading } = useInstitutionById(user?.id)
  // --- END: Hooks ------------------------------------------------------------

  return isLoading ? <Splash /> : <InstitutionProfileView institution={data?.data ?? institution} />
}
