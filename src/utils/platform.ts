import { Capacitor } from '@capacitor/core'

export const isWeb = () => Capacitor.getPlatform() === 'web'

export const isIOS = () => Capacitor.getPlatform() === 'ios'

export const isAndroid = () => Capacitor.getPlatform() === 'android'
