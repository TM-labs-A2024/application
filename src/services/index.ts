import { useDoctorMutation, useDoctorLogin } from './doctors'
import { useInstitutionMutation, useInstitutions, useInstitutionLogin } from './institutions'
import { useNurseMutation, useNurseLogin } from './nurses'
import { usePatientMutation, usePatientLogin } from './patients'
import { useSpecialties } from './specialties'

export {
  useInstitutionMutation,
  useDoctorMutation,
  useDoctorLogin,
  useNurseMutation,
  useNurseLogin,
  usePatientMutation,
  usePatientLogin,
  useInstitutions,
  useInstitutionLogin,
  useSpecialties
}
