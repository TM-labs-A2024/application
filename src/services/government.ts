import {
  loginGovernment,
  approveInstitutionsAccessRequests,
  denyInstitutionsAccessRequests,
  revokeInstitutionsAccessRequests,
  getGovernmentRequests
} from '@api/index'
import { Login } from '@src/types'
import { useQuery, useMutation, useQueryClient } from 'react-query'

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

export const useGovernmentApproveAccessRequestsMutation = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryClient = useQueryClient()

  const mutationData = useMutation({
    mutationFn: (requestId: string) => approveInstitutionsAccessRequests(requestId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['government_requests', 'government_institutions'])
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}

export const useGovernmentDenyAccessRequestsMutation = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryClient = useQueryClient()

  const mutationData = useMutation({
    mutationFn: (requestId: string) => denyInstitutionsAccessRequests(requestId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['government_requests', 'government_institutions'])
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}

export const useGovernmentRevokeAccessRequestsMutation = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryClient = useQueryClient()

  const mutationData = useMutation({
    mutationFn: (institutionId: string) => revokeInstitutionsAccessRequests(institutionId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['government_requests', 'government_institutions'])
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}

export const useGovernmentRequests = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryData = useQuery({
    queryKey: 'government_requests',
    queryFn: () => getGovernmentRequests(),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return queryData
}
