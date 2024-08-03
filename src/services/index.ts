import {
  useDoctorMutation,
  useUpdateDoctor,
  useDoctorLogin,
  useDoctorPetients,
  useDoctors,
  useDoctor
} from './doctors'
import { useGovernmentLogin } from './government'
import {
  useInstitutionMutation,
  useInstitutions,
  useInstitutionLogin,
  useInstitutionRequests
} from './institutions'
import { useNurseMutation, useNurseLogin, useNurseById } from './nurses'
import {
  usePatientMutation,
  usePatientUpdate,
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
  useNurseById,
  usePatientMutation,
  usePatientUpdate,
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
  useInstitutionRequests,
  useSpecialties,
  useGovernmentLogin,
  useRecordMutation
}
