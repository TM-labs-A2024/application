import {
  createPatient,
  updatePatient,
  loginPatient,
  getPatients,
  requestAccess,
  getPatientsAccessRequests,
  approvePatientsAccessRequests,
  denyPatientsAccessRequests,
  revokePatientsAccessRequests,
  getPatientsSpecialties,
  getPatientByGovId
} from '@api/index'
import { Patient, Login } from '@src/types'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const usePatientByGovId = (
  patientId: string,
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryData = useQuery({
    queryKey: ['patient', patientId],
    queryFn: () => getPatientByGovId(patientId),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return queryData
}

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

export const usePatientUpdate = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryClient = useQueryClient()

  const mutationData = useMutation({
    mutationFn: (data: Patient) => updatePatient(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['patient', data.data.govId])
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}

export const usePatientLogin = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const mutationData = useMutation({
    mutationFn: (data: Login) => loginPatient(data),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}

export const usePatients = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryData = useQuery({
    queryKey: 'patients',
    queryFn: () => getPatients(),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return queryData
}

export const usePatientAccessRequestMutation = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryClient = useQueryClient()

  const mutationData = useMutation({
    mutationFn: (id: string) => requestAccess(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['patients'])
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}

export const usePatientAccessRequest = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryData = useQuery({
    queryKey: 'access_requests',
    queryFn: () => getPatientsAccessRequests(),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return queryData
}

export const usePatientApproveAccessRequestsMutation = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryClient = useQueryClient()

  const mutationData = useMutation({
    mutationFn: (requestId: string) => approvePatientsAccessRequests(requestId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['access_requests'])
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}

export const usePatientDenyAccessRequestsMutation = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryClient = useQueryClient()

  const mutationData = useMutation({
    mutationFn: (requestId: string) => denyPatientsAccessRequests(requestId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['access_requests'])
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}

export const usePatientRevokeAccessRequestsMutation = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryClient = useQueryClient()

  const mutationData = useMutation({
    mutationFn: (requestId: string) => revokePatientsAccessRequests(requestId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['access_requests'])
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}

export const usePatientsSpecialties = (
  govId: string,
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryData = useQuery({
    queryKey: 'patients_specialties',
    queryFn: () => getPatientsSpecialties(govId),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    },
    enabled: !!govId
  })

  return queryData
}
