import { List, Stack, Heading, Text } from '@chakra-ui/react'
import Patient from '@components/atoms/Cards/Patient'
import { PatientSummary } from '@src/types'
import React from 'react'

export default function PatientsList({
  patients,
  pendingPatients,
  label
}: {
  patients: PatientSummary[]
  pendingPatients: PatientSummary[]
  label: string
}) {
  return (
    <Stack className="h-full" data-testid="patients-list">
      {(patients.length > 0 || pendingPatients.length > 0) && label && (
        <Heading as="h2" size="sm" className="mb-4">
          {label}
        </Heading>
      )}
      <div className="overflow-auto">
        {pendingPatients.length > 0 && (
          <>
            <Text size="sm" noOfLines={1} className="mb-4">
              Pendientes
            </Text>
            <List>
              {pendingPatients.map((patient, idx) => (
                <div
                  className="border-b border-black py-4 last:border-transparent"
                  key={`${patient.href}-${idx + 1}`}
                >
                  <Patient
                    href={patient.href}
                    title={patient.title}
                    description={patient.description}
                    status={patient.status}
                    hospitalizationPlace={patient.hospitalizationPlace}
                  />
                </div>
              ))}
            </List>
          </>
        )}
        {patients.length > 0 && (
          <>
            {pendingPatients.length > 0 && (
              <Text size="sm" noOfLines={1} className="mb-4">
                Todos
              </Text>
            )}
            <List>
              {patients?.map((patient) => (
                <div
                  className="border-b border-black py-4 last:border-transparent"
                  key={patient.href}
                >
                  <Patient
                    href={patient.href}
                    title={patient.title}
                    description={patient.description}
                    status={patient.status}
                    hospitalizationPlace={patient.hospitalizationPlace}
                  />
                </div>
              ))}
            </List>
          </>
        )}
      </div>
    </Stack>
  )
}
