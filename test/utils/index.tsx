import { ChakraProvider } from '@chakra-ui/react'
import theme from '@src/theme'
import { render, RenderOptions } from '@testing-library/react'
import React, { ReactElement } from 'react'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
