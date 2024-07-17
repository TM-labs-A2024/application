/* eslint-disable no-console */
import { GENERIC_ERROR } from '@constants/index'
import { usePatientMutation, useDoctorMutation } from '@src/services'
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
  const { mutate: createPatient } = usePatientMutation(
    (res) => {
      const { data } = res as AxiosResponse
      const { firstname, email } = data as Patient
      const emailTemplate = {
        from_name: 'HealthCore',
        to_name: firstname,
        code: verificationCode,
        to_email: email
      }
      console.log(emailTemplate)
      // sendEmail(emailTemplate)
      setUserCreated(true)
    },
    () =>
      Store.addNotification(
        GENERIC_ERROR(
          'Algo salió mal, por favor recargue la página e inténtelo de nuevo.',
          isMobile(window)
        )
      )
  )

  const { mutate: createDoctor } = useDoctorMutation(
    (res) => {
      const { data } = res as AxiosResponse
      const { firstname, email } = data as Patient
      const emailTemplate = {
        from_name: 'HealthCore',
        to_name: firstname,
        code: verificationCode,
        to_email: email
      }
      console.log(emailTemplate)
      // sendEmail(emailTemplate)
      setUserCreated(true)
    },
    () =>
      Store.addNotification(
        GENERIC_ERROR(
          'Algo salió mal, por favor recargue la página e inténtelo de nuevo.',
          isMobile(window)
        )
      )
  )
  // --- END: Hooks ------------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const context = useMemo(
    () => ({
      createPatient,
      createDoctor,
      verificationCode,
      userCreated
    }),
    [createPatient, createDoctor, userCreated]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <RegisterView context={context} />
}
