import { createRecord } from '@api/index'
import { EvolutionBody } from '@src/types'
import { useMutation } from 'react-query'

export const useRecordMutation = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const mutationData = useMutation({
    mutationFn: (data: EvolutionBody) => createRecord(data),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}
