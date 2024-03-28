import {
  NOTIFICATION_TYPE,
  NOTIFICATION_CONTAINER,
  NOTIFICATION_INSERTION
} from 'react-notifications-component'

// Manual adjustment invalid status message
export const ACCESS_REMOVED = (isMobile: boolean) => ({
  title: 'Message',
  message: 'Acceso revocado',
  type: 'success' as NOTIFICATION_TYPE,
  insert: (isMobile ? 'bottom' : 'top') as NOTIFICATION_INSERTION,
  container: (isMobile ? 'bottom-center' : 'top-right') as NOTIFICATION_CONTAINER,
  animationIn: ['animated', 'fadeIn'],
  animationOut: ['animated', 'fadeOut'],
  dismiss: {
    duration: 5000,
    onScreen: true
  }
})
