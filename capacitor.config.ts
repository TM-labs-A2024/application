import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.TMLabs.app',
  appName: 'HealthCore',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
}

export default config
