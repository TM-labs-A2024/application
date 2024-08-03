import {
  createDoctor,
  updateDoctor,
  loginDoctor,
  getDoctorPatients,
  getDoctors,
  getDoctorById
} from './doctors'
import { loginGovernment } from './government'
import {
  createInstitution,
  getInstitutions,
  loginInstitution,
  getInstitutionRequests
} from './institutions'
import { createNurse, loginNurse, getNurse } from './nurses'
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
import { createRecord } from './records'
import { getSpecialties } from './specialities'

export {
  createInstitution,
  createDoctor,
  updateDoctor,
  loginDoctor,
  getDoctorPatients,
  getDoctors,
  getDoctorById,
  createNurse,
  loginNurse,
  getNurse,
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
  loginInstitution,
  getInstitutionRequests,
  getSpecialties,
  loginGovernment,
  createRecord
}
