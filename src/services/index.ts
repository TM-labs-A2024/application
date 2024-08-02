import {
  useDoctorMutation,
  useUpdateDoctor,
  useDoctorLogin,
  useDoctorPetients,
  useDoctors,
  useDoctor
} from './doctors'
import { useGovernmentLogin } from './government'
import { useInstitutionMutation, useInstitutions, useInstitutionLogin } from './institutions'
import { useNurseMutation, useNurseLogin } from './nurses'
import {
  usePatientMutation,
  usePatientLogin,
  usePatients,
  usePatientAccessRequestMutation,
  usePatientAccessRequest,
  usePatientApproveAccessRequestsMutation,
  usePatientDenyAccessRequestsMutation,
  usePatientRevokeAccessRequestsMutation,
  usePatientsSpecialties,
  usePatientByGovId
} from './patients'
import { useRecordMutation } from './records'
import { useSpecialties } from './specialties'

export {
  useInstitutionMutation,
  useDoctorMutation,
  useUpdateDoctor,
  useDoctorLogin,
  useDoctorPetients,
  useDoctors,
  useDoctor,
  useNurseMutation,
  useNurseLogin,
  usePatientMutation,
  usePatientLogin,
  usePatients,
  usePatientAccessRequestMutation,
  usePatientAccessRequest,
  usePatientApproveAccessRequestsMutation,
  usePatientDenyAccessRequestsMutation,
  usePatientRevokeAccessRequestsMutation,
  usePatientsSpecialties,
  usePatientByGovId,
  useInstitutions,
  useInstitutionLogin,
  useSpecialties,
  useGovernmentLogin,
  useRecordMutation
}
