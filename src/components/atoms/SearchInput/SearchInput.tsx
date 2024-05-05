import { SearchIcon } from '@chakra-ui/icons'
import { InputGroup, Input, InputLeftElement } from '@chakra-ui/react'
import React from 'react'

export default function SearchInputComponent({
  placeholder,
  className,
  disabled,
  onChange = () => null,
  onClick,
  inputRef
}: {
  placeholder: string
  className?: string
  disabled?: boolean
  onChange?: (value: string) => void
  onClick?: () => void
  inputRef?: React.RefObject<HTMLInputElement>
}) {
  return (
    <div className={className}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.500" />
        </InputLeftElement>
        <Input
          className="min-h-10"
          onFocus={onClick}
          ref={inputRef}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
        />
      </InputGroup>
    </div>
  )
}
