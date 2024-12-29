import PendingAccount from '@src/components/organisms/PendingAccount'
import React from 'react'

export default function PendingAccountView({ onClick }: { onClick: () => void }) {
  return <PendingAccount onClick={onClick} />
}
