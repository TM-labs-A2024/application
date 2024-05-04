import { Heading, List, Text, Button } from '@chakra-ui/react'
import SearchInputComponent from '@components/atoms/SearchInput'
import { Patient } from '@src/types'
import { isIOS } from '@utils/index'
import React from 'react'

export default function AddPatient({
  context
}: {
  context: {
    onChange: (id: string) => void
    filteredPatients: Patient[] | []
    onSubmit: () => void
  }
}) {
  // --- Hooks -----------------------------------------------------------------
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const { onChange, filteredPatients, onSubmit } = context
  // --- END: Local state ------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  // --- END: Data and handlers ------------------------------------------------

  return (
    <div
      className={`mx-auto block h-screen w-screen overflow-hidden px-8 lg:px-96 ${isIOS() ? 'pt-20' : 'pt-8'}`}
    >
      <Heading as="h2" size="md" className="mb-4">
        Nuevo paciente
      </Heading>
      <SearchInputComponent
        placeholder="Ingresar cédula"
        className="mb-8 w-full"
        onChange={onChange}
      />
      {filteredPatients.length > 0 && (
        <Heading as="h2" size="sm" noOfLines={1} className="mb-4">
          {filteredPatients.length > 1
            ? `${filteredPatients.length} resultados`
            : `${filteredPatients.length} resultado`}
        </Heading>
      )}
      <List spacing={3} className="h-full overflow-scroll pb-56">
        {filteredPatients.map((patient, idx) => (
          <div
            className="flex flex-row items-center justify-between"
            key={`new-patient-${idx + 1}`}
          >
            <div className="flex flex-col">
              <Text>
                {patient.firstname} {patient.lastname}
              </Text>
              <Text>{patient.govId}</Text>
            </div>
            <Button
              onClick={patient?.pending ? () => null : onSubmit}
              disabled={patient?.pending}
              className={patient?.pending ? 'cursor-not-allowed' : ''}
            >
              {patient?.pending ? 'Solicitado' : 'Solicitar acceso'}
            </Button>
          </div>
        ))}
      </List>
    </div>
  )
}
