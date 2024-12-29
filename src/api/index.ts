import {
  createDoctor,
  updateDoctor,
  loginDoctor,
  getDoctorPatients,
  getDoctors,
  getDoctorById,
  getInstitutionDoctors
} from './doctors'
import {
  loginGovernment,
  approveInstitutionsAccessRequests,
  denyInstitutionsAccessRequests,
  revokeInstitutionsAccessRequests,
  getGovernmentRequests
} from './government'
import {
  createInstitution,
  getInstitutions,
  getInstitution,
  loginInstitution,
  getInstitutionRequests,
  approveDoctorsAccessRequests,
  denyDoctorsAccessRequests,
  revokeDoctorsAccessRequests,
  getApprovedInstitutions,
  getInstitutionPatients
} from './institutions'
import { createNurse, loginNurse, getNurse, getNurses, getInstitutionNurses } from './nurses'
import {
  createPatient,
  updatePatient,
  loginPatient,
  getPatients,
  requestAccess,
  getPatientsAccessRequests,
  approvePatientsAccessRequests,
  denyPatientsAccessRequests,
  revokePatientsAccessRequests,
  getPatientsSpecialties,
  getPatientByGovId
} from './patients'
import {
  createRecord,
  getRecords,
  getRecord,
  createEvolution,
  deleteRecord,
  deleteAttachment
} from './records'
import { getSpecialties } from './specialities'

export {
  createInstitution,
  createDoctor,
  updateDoctor,
  loginDoctor,
  getDoctorPatients,
  getDoctors,
  getDoctorById,
  getInstitutionDoctors,
  createNurse,
  loginNurse,
  getNurse,
  getNurses,
  getInstitutionNurses,
  createPatient,
  updatePatient,
  loginPatient,
  getPatients,
  requestAccess,
  getPatientsAccessRequests,
  approvePatientsAccessRequests,
  denyPatientsAccessRequests,
  revokePatientsAccessRequests,
  getPatientsSpecialties,
  getPatientByGovId,
  getInstitutions,
  getInstitution,
  loginInstitution,
  getInstitutionRequests,
  approveDoctorsAccessRequests,
  denyDoctorsAccessRequests,
  revokeDoctorsAccessRequests,
  getApprovedInstitutions,
  getInstitutionPatients,
  getSpecialties,
  loginGovernment,
  approveInstitutionsAccessRequests,
  denyInstitutionsAccessRequests,
  revokeInstitutionsAccessRequests,
  getGovernmentRequests,
  createRecord,
  getRecords,
  getRecord,
  createEvolution,
  deleteRecord,
  deleteAttachment
}
