import type { Config } from '@jest/types'
import nextJest from 'next/jest'

export const customJestConfig: Config.InitialOptions = {
  testEnvironment: 'jest-environment-jsdom',
  verbose: true
}

export const createJestConfig = nextJest({
  dir: './'
})

const jestConfig = async () => {
  const nextJestConfig = await createJestConfig(customJestConfig)()

  return {
    ...nextJestConfig,
    moduleNameMapper: {
      // Workaround to put our SVG mock first
      '\\.svg$': '<rootDir>/__mocks__/svg.js',
      '^@src/(.*)$': '<rootDir>/src/$1',
      '^@components/(.*)$': '<rootDir>/src/components/$1',
      '^@app/(.*)$': '<rootDir>/src/app/$1',
      '^@views/(.*)$': '<rootDir>/src/views/$1',
      '^@constants/(.*)$': '<rootDir>/src/constants/$1',
      '^@layouts/(.*)$': '<rootDir>/src/layouts/$1',
      '^@styles/(.*)$': '<rootDir>/src/styles/$1',
      '^@providers/(.*)$': '<rootDir>/src/providers/$1',
      '^@utils/(.*)$': '<rootDir>/src/utils/$1',
      '^@shared/(.*)$': '<rootDir>/src/shared/$1',
      '^@test/(.*)$': '<rootDir>/test/$1',
      ...nextJestConfig.moduleNameMapper
    }
  }
}

module.exports = jestConfig
