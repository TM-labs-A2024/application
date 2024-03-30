import { Capacitor } from '@capacitor/core'

export const isWeb = () => Capacitor.getPlatform() === 'web'

export const isIOS = () => Capacitor.getPlatform() === 'ios'

export const isAndroid = () => Capacitor.getPlatform() === 'android'

export const isMobile = (window: { screen: { availWidth: number } }) =>
  Capacitor.getPlatform() === 'ios' ||
  Capacitor.getPlatform() === 'android' ||
  window?.screen?.availWidth < 425
