import { setSession, getSession } from '@shared/index'
import {
  usePatientLogin,
  useDoctorLogin,
  useNurseLogin,
  useInstitutionLogin,
  useGovernmentLogin
} from '@src/services'
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
      const { token, patient } = data as LoginResponse
      setSession('patient', token, patient)
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
      const { token, doctor } = data as LoginResponse
      setSession('doctor', token, doctor)
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
      const { token, nurse } = data as LoginResponse
      setSession('enfermere', token, nurse)
      router.replace('/pacientes')
      window.setTimeout(() => setIsLoading(false), 2000)
    },
    () => {
      setIsLoading(false)
      setupErrorNotification()
    }
  )

  const { mutate: loginInstitution, isLoading: isInstitutionLoginLoading } = useInstitutionLogin(
    (res) => {
      const { data } = res as AxiosResponse
      const { token, user } = data as LoginResponse
      setSession('institucion', token, user)
      router.replace('/institucion/solicitudes')
      window.setTimeout(() => setIsLoading(false), 2000)
    },
    () => {
      setIsLoading(false)
      setupErrorNotification()
    }
  )

  const { mutate: loginGovernment, isLoading: isGovernmentLoginLoading } = useGovernmentLogin(
    (res) => {
      const { data } = res as AxiosResponse
      const { token } = data as LoginResponse
      setSession('institucion', token, '')
      router.replace('/ministerio/solicitudes')
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
    if (
      isPatientLoginLoading ||
      isDoctorLoginLoading ||
      isNurseLoginLoading ||
      isInstitutionLoginLoading ||
      isGovernmentLoginLoading
    )
      setIsLoading(true)
  }, [
    isDoctorLoginLoading,
    isNurseLoginLoading,
    isPatientLoginLoading,
    isInstitutionLoginLoading,
    isGovernmentLoginLoading
  ])
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const type = getSession()

  const context = useMemo(
    () => ({
      type,
      loginPatient,
      loginDoctor,
      loginNurse,
      loginInstitution,
      loginGovernment,
      isLoading
    }),
    [type, loginPatient, loginDoctor, loginNurse, loginInstitution, loginGovernment, isLoading]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <LoginView context={context} />
}
