import { Institution } from '@src/types'

import { axiosClient } from './clients'

export function createInstitution(body: Institution) {
  return axiosClient.post<Institution>('/institutions', body)
}
