import { createInstitution, getInstitutions } from '@api/index'
import { Institution } from '@src/types'
import { useQuery, useMutation } from 'react-query'

export const useInstitutionMutation = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const mutationData = useMutation({
    mutationFn: (data: Institution) => createInstitution(data),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}

export const useInstitutions = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const mutationData = useQuery({
    queryKey: 'institutions',
    queryFn: () => getInstitutions(),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}
