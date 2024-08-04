import {
  createDoctor,
  updateDoctor,
  loginDoctor,
  getDoctorPatients,
  getDoctors,
  getDoctorById,
  getInstitutionDoctors
} from '@api/index'
import { Doctor, Login } from '@src/types'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useDoctorMutation = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const mutationData = useMutation({
    mutationFn: (data: Doctor) => createDoctor(data),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}

export const useDoctorLogin = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const mutationData = useMutation({
    mutationFn: (data: Login) => loginDoctor(data),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}

export const useDoctorPetients = (
  doctorId: string,
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryData = useQuery({
    queryFn: () => getDoctorPatients(doctorId),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return queryData
}

export const useDoctors = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryData = useQuery({
    queryFn: () => getDoctors(),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return queryData
}

export const useDoctor = (
  doctorId: string,
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryData = useQuery({
    queryKey: ['doctor', doctorId],
    queryFn: () => getDoctorById(doctorId),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return queryData
}

export const useUpdateDoctor = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryClient = useQueryClient()
  const mutationData = useMutation({
    mutationFn: (data: Doctor) => updateDoctor(data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries(['doctor', data.id])
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}

export const useInstitutionDoctors = (
  institutionId: string,
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryData = useQuery({
    queryKey: ['institution_doctors'],
    queryFn: () => getInstitutionDoctors(institutionId),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return queryData
}
