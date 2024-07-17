import { createInstitution } from '@api/index'
import { Institution } from '@src/types'
import { useMutation } from 'react-query'

export const useInstitutionMutation = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const mutationInfo = useMutation({
    mutationFn: (data: Institution) => createInstitution(data),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationInfo
}
