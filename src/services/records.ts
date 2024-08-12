import {
  createRecord,
  getRecords,
  getRecord,
  createEvolution,
  deleteRecord,
  deleteAttachment
} from '@api/index'
import { EvolutionBody, EvolutionJSONBody } from '@src/types'
import { useMutation, useQuery, useQueryClient } from 'react-query'

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

export const useEvolutionMutation = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const mutationData = useMutation({
    mutationFn: (data: EvolutionJSONBody) => createEvolution(data),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}

export const useSpecialityRecordsByPatientGovId = (
  specialtyId: string,
  govId: string,
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryData = useQuery({
    queryKey: [specialtyId, govId],
    queryFn: () => getRecords(specialtyId, govId),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return queryData
}

export const useRecordById = (
  recordId: string,
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryData = useQuery({
    queryKey: ['record', recordId],
    queryFn: () => getRecord(recordId),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return queryData
}

export const useRecordDelete = (
  id: string,
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryClient = useQueryClient()
  const mutationData = useMutation({
    mutationFn: (recordId: string) => deleteRecord(recordId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['record', id])
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}

export const useAttachmentDelete = (
  id: string,
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryClient = useQueryClient()
  const mutationData = useMutation({
    mutationFn: (recordId: string) => deleteAttachment(recordId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['record', id])
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return mutationData
}
