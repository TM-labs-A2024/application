import { createDoctor, loginDoctor, getDoctorPatients, getDoctors, getDoctorById } from './doctors'
import { loginGovernment } from './government'
import { createInstitution, getInstitutions, loginInstitution } from './institutions'
import { createNurse, loginNurse } from './nurses'
import {
  createPatient,
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
  loginDoctor,
  getDoctorPatients,
  getDoctors,
  getDoctorById,
  createNurse,
  loginNurse,
  createPatient,
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
  getSpecialties,
  loginGovernment,
  createRecord
}
