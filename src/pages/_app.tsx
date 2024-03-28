import '@styles/globals.css'
import 'react-notifications-component/dist/theme.css'
import { Providers } from '@providers/index'
import type { AppProps } from 'next/app'
import { ReactNotifications } from 'react-notifications-component'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <ReactNotifications />
      <Component {...pageProps} />
    </Providers>
  )
}
