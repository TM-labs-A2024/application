import { List } from '@chakra-ui/react'
import Evolution from '@components/atoms/Cards/Evolution'
import React from 'react'

export default function EvolutionsList({
  evolutions
}: {
  evolutions: {
    href: string
    title: string
    description: string
    comment: string
  }[]
}) {
  return (
    <List spacing={3} className="h-full overflow-scroll">
      {evolutions.map((evolution) => (
        <Evolution
          href={evolution.href}
          title={evolution.title}
          description={evolution.description}
          comment={evolution.comment}
          key={evolution.href}
        />
      ))}
    </List>
  )
}
