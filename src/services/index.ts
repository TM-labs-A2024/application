import {
  useDoctorMutation,
  useUpdateDoctor,
  useDoctorLogin,
  useDoctorPetients,
  useDoctors,
  useDoctor,
  useInstitutionDoctors
} from './doctors'
import {
  useGovernmentLogin,
  useGovernmentApproveAccessRequestsMutation,
  useGovernmentDenyAccessRequestsMutation,
  useGovernmentRevokeAccessRequestsMutation,
  useGovernmentRequests
} from './government'
import {
  useInstitutionMutation,
  useInstitutions,
  useInstitutionById,
  useInstitutionLogin,
  useInstitutionRequests,
  useInstitutionApproveAccessRequestsMutation,
  useInstitutionDenyAccessRequestsMutation,
  useInstitutionRevokeAccessRequestsMutation,
  useApprovedInstitutions
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
  useInstitutionDoctors,
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
  useInstitutionById,
  useInstitutionLogin,
  useInstitutionRequests,
  useInstitutionApproveAccessRequestsMutation,
  useInstitutionDenyAccessRequestsMutation,
  useInstitutionRevokeAccessRequestsMutation,
  useApprovedInstitutions,
  useSpecialties,
  useGovernmentLogin,
  useGovernmentApproveAccessRequestsMutation,
  useGovernmentDenyAccessRequestsMutation,
  useGovernmentRevokeAccessRequestsMutation,
  useGovernmentRequests,
  useRecordMutation
}
