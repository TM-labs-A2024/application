import { Doctor } from '@src/types'

import { axiosClient } from './clients'

export function createDoctor(body: Doctor) {
  return axiosClient.post<Doctor>('/doctors', body)
}
