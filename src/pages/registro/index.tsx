/* eslint-disable no-console */
import { GENERIC_ERROR } from '@constants/index'
import {
  usePatientMutation,
  useDoctorMutation,
  useNurseMutation,
  useInstitutions,
  useSpecialties
} from '@src/services'
import { Patient } from '@src/types'
// import { sendEmail } from '@utils/index'
import { isMobile } from '@utils/index'
import RegisterView from '@views/Register'
import { AxiosResponse } from 'axios'
import { useMemo, useState } from 'react'
import React from 'react'
import { Store } from 'react-notifications-component'

// Creation of the verification code
const verificationCode = String(Math.floor(Math.random() * 1000000))

export default function RegisterPage() {
  // --- Local state -----------------------------------------------------------
  const [userCreated, setUserCreated] = useState(false)
  // --- END: Local state ------------------------------------------------------

  // --- Hooks -----------------------------------------------------------------
  const setupEmailSending = (name: string, code: string, email: string) => {
    const emailTemplate = {
      from_name: 'HealthCore',
      to_name: name,
      code: code,
      to_email: email
    }
    console.log(emailTemplate)
    // sendEmail(emailTemplate)
  }

  const setupErrorNotification = () => {
    Store.addNotification(
      GENERIC_ERROR(
        'Algo salió mal, por favor recargue la página e inténtelo de nuevo.',
        isMobile(window)
      )
    )
  }

  const { mutate: createPatient, isLoading: isPatientCreationLoading } = usePatientMutation(
    (res) => {
      const { data } = res as AxiosResponse
      const { firstname, email } = data as Patient
      setupEmailSending(firstname, verificationCode, email)
      setUserCreated(true)
    },
    () => {
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
    },
    () => {
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
    },
    () => {
      setupErrorNotification()
      setUserCreated(false)
    }
  )

  const { data: institutions, isLoading: isInstitutionsLoading } = useInstitutions()

  const { data: specialties, isLoading: isSpecialtiesLoading } = useSpecialties()
  // --- END: Hooks ------------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const isLoading = useMemo(
    () =>
      isPatientCreationLoading ||
      isDoctorCreationLoading ||
      isInstitutionsLoading ||
      isSpecialtiesLoading ||
      isNurseCreationLoading,
    [
      isDoctorCreationLoading,
      isInstitutionsLoading,
      isPatientCreationLoading,
      isSpecialtiesLoading,
      isNurseCreationLoading
    ]
  )

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
      userCreated,
      isLoading,
      institutionsData,
      specialtiesData
    ]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <RegisterView context={context} />
}
