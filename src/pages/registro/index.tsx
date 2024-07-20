import { setSession } from '@shared/index'
import {
  usePatientMutation,
  useDoctorMutation,
  useNurseMutation,
  usePatientLogin,
  useInstitutions,
  useSpecialties
} from '@src/services'
import { LoginResponse, Patient } from '@src/types'
import { setupEmailSending, generateVerificationCode, setupErrorNotification } from '@utils/index'
import RegisterView from '@views/Register'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useMemo, useState, useEffect, useCallback } from 'react'
import React from 'react'

const verificationCode = generateVerificationCode()

export default function RegisterPage() {
  // --- Local state -----------------------------------------------------------
  const [userCreated, setUserCreated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  // --- END: Local state ------------------------------------------------------

  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()

  const { data: institutions, isLoading: isInstitutionsLoading } = useInstitutions(
    () => setIsLoading(false),
    () => setIsLoading(false)
  )

  const { data: specialties, isLoading: isSpecialtiesLoading } = useSpecialties(
    () => setIsLoading(false),
    () => setIsLoading(false)
  )

  const { mutate: createPatient, isLoading: isPatientCreationLoading } = usePatientMutation(
    (res) => {
      const { data } = res as AxiosResponse
      const { firstname, email } = data as Patient
      setupEmailSending(firstname, verificationCode, email)
      setUserCreated(true)
      setIsLoading(false)
    },
    () => {
      setIsLoading(false)
      setupErrorNotification()
      setUserCreated(false)
    }
  )

  const { mutate: createDoctor, isLoading: isDoctorCreationLoading } = useDoctorMutation(
    (res) => {
      const { data } = res as AxiosResponse
      const { firstname, email } = data as Patient
      setupEmailSending(firstname, verificationCode, email)
      setUserCreated(true)
      setIsLoading(false)
    },
    () => {
      setIsLoading(false)
      setupErrorNotification()
      setUserCreated(false)
    }
  )

  const { mutate: createNurse, isLoading: isNurseCreationLoading } = useNurseMutation(
    (res) => {
      const { data } = res as AxiosResponse
      const { firstname, email } = data as Patient
      setupEmailSending(firstname, verificationCode, email)
      setUserCreated(true)
      setIsLoading(false)
    },
    () => {
      setIsLoading(false)
      setupErrorNotification()
      setUserCreated(false)
    }
  )

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
  // --- END: Hooks ------------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  useEffect(() => {
    if (
      isPatientCreationLoading ||
      isDoctorCreationLoading ||
      isNurseCreationLoading ||
      isPatientLoginLoading ||
      isInstitutionsLoading ||
      isSpecialtiesLoading
    )
      setIsLoading(true)
  }, [
    isDoctorCreationLoading,
    isNurseCreationLoading,
    isPatientCreationLoading,
    isPatientLoginLoading,
    isInstitutionsLoading,
    isSpecialtiesLoading
  ])
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const loginDoctor = useCallback(() => {
    router.replace('/registro/pendiente')
    window.setTimeout(() => setIsLoading(false), 2000)
  }, [router])

  const loginNurse = useCallback(() => {
    router.replace('/registro/pendiente')
    window.setTimeout(() => setIsLoading(false), 2000)
  }, [router])

  const institutionsData = useMemo(() => {
    if (!institutions) return []

    const { data } = institutions as AxiosResponse

    return data
  }, [institutions])

  const specialtiesData = useMemo(() => {
    if (!specialties) return []

    const { data } = specialties as AxiosResponse

    return data
  }, [specialties])

  const context = useMemo(
    () => ({
      createPatient,
      createDoctor,
      createNurse,
      loginPatient,
      loginDoctor,
      loginNurse,
      verificationCode,
      userCreated,
      isLoading,
      institutionsData,
      specialtiesData
    }),
    [
      createPatient,
      createDoctor,
      createNurse,
      loginPatient,
      loginDoctor,
      loginNurse,
      userCreated,
      isLoading,
      institutionsData,
      specialtiesData
    ]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <RegisterView context={context} />
}
