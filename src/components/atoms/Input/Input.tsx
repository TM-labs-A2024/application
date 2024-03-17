import { Input } from '@chakra-ui/react'
import React from 'react'

export default function InputComponent({
  placeholder,
  label,
  className,
  disabled
}: {
  placeholder: string
  label: string
  className: string
  disabled: boolean
}) {
  return (
    <div className={className}>
      <label>{label}</label>
      <Input placeholder={placeholder} size="md" disabled={disabled} />
    </div>
  )
}
