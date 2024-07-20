import { setSession, getSession } from '@shared/index'
import { usePatientLogin, useDoctorLogin, useNurseLogin } from '@src/services'
import { LoginResponse } from '@src/types'
import { setupErrorNotification } from '@utils/index'
import LoginView from '@views/Login'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useMemo, useState, useEffect } from 'react'
import React from 'react'

export default function LoginPage() {
  // --- Local state -----------------------------------------------------------
  const [isLoading, setIsLoading] = useState(false)
  // --- END: Local state ------------------------------------------------------

  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()

  const { mutate: loginPatient, isLoading: isPatientLoginLoading } = usePatientLogin(
    (res) => {
      const { data } = res as AxiosResponse
      const { token } = data as LoginResponse
      setSession('patient', token)
      router.replace('/especialidades')
      window.setTimeout(() => setIsLoading(false), 2000)
    },
    () => {
      setIsLoading(false)
      setupErrorNotification()
    }
  )

  const { mutate: loginDoctor, isLoading: isDoctorLoginLoading } = useDoctorLogin(
    (res) => {
      const { data } = res as AxiosResponse
      const { token } = data as LoginResponse
      setSession('doctor', token)
      router.replace('/pacientes')
      window.setTimeout(() => setIsLoading(false), 2000)
    },
    () => {
      setIsLoading(false)
      setupErrorNotification()
    }
  )

  const { mutate: loginNurse, isLoading: isNurseLoginLoading } = useNurseLogin(
    (res) => {
      const { data } = res as AxiosResponse
      const { token } = data as LoginResponse
      setSession('enfermere', token)
      router.replace('/pacientes')
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
    if (isPatientLoginLoading || isDoctorLoginLoading || isNurseLoginLoading) setIsLoading(true)
  }, [isDoctorLoginLoading, isNurseLoginLoading, isPatientLoginLoading])
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const type = getSession()

  const context = useMemo(
    () => ({
      type,
      loginPatient,
      loginDoctor,
      loginNurse,
      isLoading
    }),
    [type, loginPatient, loginDoctor, loginNurse, isLoading]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <LoginView context={context} />
}
