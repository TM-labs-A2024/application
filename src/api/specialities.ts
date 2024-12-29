import { Specialties } from '@src/types'

import { axiosClient } from './clients'

export function getSpecialties() {
  return axiosClient.get<Specialties>('/specialties')
}
