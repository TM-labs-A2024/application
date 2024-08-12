import {
  useDoctorMutation,
  useUpdateDoctor,
  useDoctorLogin,
  useDoctorPatients,
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
  useApprovedInstitutions,
  useInstitutionPatients
} from './institutions'
import {
  useNurseMutation,
  useNurseLogin,
  useNurseById,
  useNurses,
  useInstitutionNurses
} from './nurses'
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
import {
  useRecordMutation,
  useSpecialityRecordsByPatientGovId,
  useRecordById,
  useEvolutionMutation,
  useRecordDelete,
  useAttachmentDelete
} from './records'
import { useSpecialties } from './specialties'

export {
  useInstitutionMutation,
  useDoctorMutation,
  useUpdateDoctor,
  useDoctorLogin,
  useDoctorPatients,
  useDoctors,
  useDoctor,
  useInstitutionDoctors,
  useNurseMutation,
  useNurseLogin,
  useNurseById,
  useNurses,
  useInstitutionNurses,
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
  useInstitutionPatients,
  useSpecialties,
  useGovernmentLogin,
  useGovernmentApproveAccessRequestsMutation,
  useGovernmentDenyAccessRequestsMutation,
  useGovernmentRevokeAccessRequestsMutation,
  useGovernmentRequests,
  useRecordMutation,
  useSpecialityRecordsByPatientGovId,
  useRecordById,
  useEvolutionMutation,
  useRecordDelete,
  useAttachmentDelete
}
