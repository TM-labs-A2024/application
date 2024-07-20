import { loginGovernment } from '@api/index'
import { Login } from '@src/types'
import { useMutation } from 'react-query'

export const useGovernmentLogin = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const mutationData = useMutation({
    mutationFn: (data: Login) => loginGovernment(data),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}
