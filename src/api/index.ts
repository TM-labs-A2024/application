import { createDoctor, loginDoctor } from './doctors'
import { loginGovernment } from './government'
import { createInstitution, getInstitutions, loginInstitution } from './institutions'
import { createNurse, loginNurse } from './nurses'
import { createPatient, loginPatient } from './patients'
import { getSpecialties } from './specialities'

export {
  createInstitution,
  createDoctor,
  loginDoctor,
  createNurse,
  loginNurse,
  createPatient,
  loginPatient,
  getInstitutions,
  loginInstitution,
  getSpecialties,
  loginGovernment
}
