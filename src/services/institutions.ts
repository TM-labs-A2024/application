import {
  createInstitution,
  getInstitutions,
  getInstitution,
  loginInstitution,
  getInstitutionRequests,
  approveDoctorsAccessRequests,
  denyDoctorsAccessRequests,
  revokeDoctorsAccessRequests,
  getApprovedInstitutions,
  getInstitutionPatients
} from '@api/index'
import { InstitutionRegister, Login } from '@src/types'
import { useQuery, useMutation, useQueryClient } from 'react-query'

export const useInstitutionMutation = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const mutationData = useMutation({
    mutationFn: (data: InstitutionRegister) => createInstitution(data),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}
export const useInstitutionById = (
  institutionId: string,
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryData = useQuery({
    queryKey: ['institution', institutionId],
    queryFn: () => getInstitution(institutionId),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return queryData
}

export const useInstitutions = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryData = useQuery({
    queryKey: 'institutions',
    queryFn: () => getInstitutions(),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return queryData
}
export const useInstitutionPatients = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryData = useQuery({
    queryKey: 'institution_patients',
    queryFn: () => getInstitutionPatients(),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return queryData
}

export const useApprovedInstitutions = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryData = useQuery({
    queryKey: 'approved_institutions',
    queryFn: () => getApprovedInstitutions(),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return queryData
}

export const useInstitutionLogin = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const mutationData = useMutation({
    mutationFn: (data: Login) => loginInstitution(data),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}

export const useInstitutionRequests = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryData = useQuery({
    queryKey: 'institution_requests',
    queryFn: () => getInstitutionRequests(),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return queryData
}

export const useInstitutionApproveAccessRequestsMutation = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryClient = useQueryClient()

  const mutationData = useMutation({
    mutationFn: (requestId: string) => approveDoctorsAccessRequests(requestId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['institution_requests', 'institution_doctors'])
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}

export const useInstitutionDenyAccessRequestsMutation = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryClient = useQueryClient()

  const mutationData = useMutation({
    mutationFn: (requestId: string) => denyDoctorsAccessRequests(requestId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['institution_requests', 'institution_doctors'])
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}

export const useInstitutionRevokeAccessRequestsMutation = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryClient = useQueryClient()

  const mutationData = useMutation({
    mutationFn: (doctorId: string) => revokeDoctorsAccessRequests(doctorId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['institution_requests', 'institution_doctors'])
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}
