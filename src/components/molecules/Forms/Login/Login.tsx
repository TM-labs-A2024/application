import { Button } from '@chakra-ui/react'
import Input from '@components/atoms/Input'
import React from 'react'

export default function LoginForm({ isLoading }: { isLoading: boolean }) {
  return (
    <form className="flex flex-col items-center gap-4">
      <Input
        placeholder="Introduzca su correo electrónico"
        label="Correo electrónico"
        className="w-full"
        disabled={isLoading}
      />
      <Input
        placeholder="Introduzca su contraseña"
        label="Contraseña"
        className="w-full"
        disabled={isLoading}
      />
      <Button isLoading={isLoading} type="submit">
        Ingresar
      </Button>
    </form>
  )
}
