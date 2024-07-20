import { createNurse, loginNurse } from '@api/index'
import { Login, Nurse } from '@src/types'
import { useMutation } from 'react-query'

export const useNurseMutation = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const mutationData = useMutation({
    mutationFn: (data: Nurse) => createNurse(data),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}

export const useNurseLogin = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const mutationData = useMutation({
    mutationFn: (data: Login) => loginNurse(data),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}
