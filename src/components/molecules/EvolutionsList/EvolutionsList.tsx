import { List } from '@chakra-ui/react'
import Evolution from '@components/atoms/Cards/Evolution'
import { CardEvolution } from '@src/types'
import React from 'react'

export default function EvolutionsList({ evolutions }: { evolutions?: CardEvolution[] }) {
  return (
    <List spacing={3} className="h-full" data-testid="evolutions-list">
      {evolutions?.map((evolution) => (
        <div className="border-b border-black last:border-transparent" key={evolution.href}>
          <Evolution
            href={evolution.href}
            title={evolution.title}
            description={evolution.description}
            comment={evolution.comment}
          />
        </div>
      ))}
    </List>
  )
}
