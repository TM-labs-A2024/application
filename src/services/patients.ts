import { createPatient } from '@api/index'
import { Patient } from '@src/types'
import { useMutation } from 'react-query'

export const usePatientMutation = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const mutationData = useMutation({
    mutationFn: (data: Patient) => createPatient(data),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}
