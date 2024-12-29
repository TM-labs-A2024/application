import AddEvolution from '@components/molecules/Forms/AddEvolution'
import { EvolutionFormData } from '@src/types'
import React from 'react'

export default function AddEvolutionView({
  context
}: {
  context: { onSubmit: (data: EvolutionFormData) => void; isLoading: boolean }
}) {
  return <AddEvolution context={context} />
}
