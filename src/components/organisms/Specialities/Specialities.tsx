import SearchInputComponent from '@components/atoms/SearchInput'
import SpecialitiesList from '@components/molecules/SpecialitiesList'
import { specialities } from '@src/constants'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Specialities() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  // --- END: Hooks ------------------------------------------------------------

  return (
    <div className="mx-auto block h-screen w-screen overflow-hidden px-8 pb-56 pt-8 lg:w-1/2">
      <Image
        alt="logo"
        src="/static/images/logo-horizontal.png"
        width={200}
        height={80}
        className="mx-auto mb-8"
      />
      {specialities.length > 0 && (
        <SearchInputComponent
          placeholder="Buscar especialidad"
          className="mb-8 w-full"
          onClick={() => {
            router.push('/especialidades/busqueda')
          }}
        />
      )}
      <SpecialitiesList specialities={specialities} label="Especialidades" />
    </div>
  )
}
