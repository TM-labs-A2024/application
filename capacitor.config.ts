import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.TMLabs.app',
  appName: 'next-application',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
}

export default config
