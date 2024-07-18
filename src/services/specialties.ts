import { getSpecialties } from '@api/index'
import { useQuery } from 'react-query'

export const useSpecialties = (
  onSuccess?: (arg: unknown) => void,
  onError?: (arg: unknown) => void
) => {
  const queryData = useQuery({
    queryKey: 'specialties',
    queryFn: () => getSpecialties(),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (err: Error) => {
      if (onError) onError(err)
    }
  })

  return queryData
}
