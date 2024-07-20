import { useInstitutionMutation, useInstitutionLogin } from '@src/services'
import { setSession } from '@src/shared'
import { InstitutionRegister, LoginResponse } from '@src/types'
import { setupEmailSending, generateVerificationCode, setupErrorNotification } from '@utils/index'
import RegisterInstitutionView from '@views/RegisterInstitution'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useMemo, useState, useEffect } from 'react'

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

  const { mutate: loginInstitution, isLoading: isInstitutionLoginLoading } = useInstitutionLogin(
    (res) => {
      const { data } = res as AxiosResponse
      const { token } = data as LoginResponse
      setSession('institucion', token)
      router.replace('/institucion/solicitudes')
      window.setTimeout(() => setIsLoading(false), 2000)
    },
    () => {
      setIsLoading(false)
      setupErrorNotification()
    }
  )
  // --- END: Hooks ------------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  useEffect(() => {
    if (isInstitutionCreationLoading || isInstitutionLoginLoading) setIsLoading(true)
  }, [isInstitutionCreationLoading, isInstitutionLoginLoading])
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
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
