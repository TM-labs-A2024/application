import { Input } from '@chakra-ui/react'
import React from 'react'

export default function InputComponent({
  placeholder,
  label,
  className,
  disabled,
  id
}: {
  id?: string
  placeholder: string
  label: string
  className: string
  disabled: boolean
}) {
  return (
    <div className={className} data-testid="input-component">
      <label htmlFor={id}>{label}</label>
      <Input placeholder={placeholder} size="md" disabled={disabled} id={id} className="min-h-10" />
    </div>
  )
}
