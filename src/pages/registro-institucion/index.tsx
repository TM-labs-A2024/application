import { useInstitutionMutation } from '@src/services'
import { InstitutionRegister } from '@src/types'
import { setupEmailSending, generateVerificationCode, setupErrorNotification } from '@utils/index'
import RegisterInstitutionView from '@views/RegisterInstitution'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useMemo, useState, useEffect, useCallback } from 'react'

const verificationCode = generateVerificationCode()

export default function RegisterPage() {
  // --- Local state -----------------------------------------------------------
  const [institutionCreated, setInstitutionCreated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  // --- END: Local state ------------------------------------------------------

  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()

  const { mutate: createInstitution, isLoading: isInstitutionCreationLoading } =
    useInstitutionMutation(
      (res) => {
        const { data } = res as AxiosResponse
        const { name, institutionUser } = data as InstitutionRegister
        setupEmailSending(name, verificationCode, institutionUser.email)
        setInstitutionCreated(true)
        setIsLoading(false)
      },
      () => {
        setupErrorNotification()
        setInstitutionCreated(false)
        setIsLoading(false)
      }
    )
  // --- END: Hooks ------------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  useEffect(() => {
    if (isInstitutionCreationLoading) setIsLoading(true)
  }, [isInstitutionCreationLoading])
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const loginInstitution = useCallback(() => {
    router.replace('/registro/pendiente')
    window.setTimeout(() => setIsLoading(false), 2000)
  }, [router])

  const context = useMemo(
    () => ({
      createInstitution,
      loginInstitution,
      verificationCode,
      institutionCreated,
      isLoading
    }),
    [createInstitution, loginInstitution, institutionCreated, isLoading]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <RegisterInstitutionView context={context} />
}
