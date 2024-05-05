import {
  NOTIFICATION_TYPE,
  NOTIFICATION_CONTAINER,
  NOTIFICATION_INSERTION
} from 'react-notifications-component'

// Successful access removed to doctors
export const ACCESS_REMOVED = (isMobile: boolean) => ({
  title: 'Mensaje',
  message: 'Acceso revocado',
  type: 'success' as NOTIFICATION_TYPE,
  insert: (isMobile ? 'bottom' : 'top') as NOTIFICATION_INSERTION,
  container: (isMobile ? 'bottom-center' : 'top-right') as NOTIFICATION_CONTAINER,
  animationIn: ['animated', 'fadeIn'],
  animationOut: ['animated', 'fadeOut'],
  dismiss: {
    duration: 3000
  }
})

// Successful deletion of attachments
export const ATTACHMENT_DELETED = (isMobile: boolean, isOrder: boolean) => ({
  title: 'Mensaje',
  message: isOrder ? 'Orden eliminada' : 'Análisis eliminado',
  type: 'success' as NOTIFICATION_TYPE,
  insert: (isMobile ? 'bottom' : 'top') as NOTIFICATION_INSERTION,
  container: (isMobile ? 'bottom-center' : 'top-right') as NOTIFICATION_CONTAINER,
  animationIn: ['animated', 'fadeIn'],
  animationOut: ['animated', 'fadeOut'],
  dismiss: {
    duration: 3000
  }
})

// Successful deletion of image
export const IMAGE_DELETED = (isMobile: boolean) => ({
  title: 'Mensaje',
  message: 'Imagen eliminada',
  type: 'success' as NOTIFICATION_TYPE,
  insert: (isMobile ? 'bottom' : 'top') as NOTIFICATION_INSERTION,
  container: (isMobile ? 'bottom-center' : 'top-right') as NOTIFICATION_CONTAINER,
  animationIn: ['animated', 'fadeIn'],
  animationOut: ['animated', 'fadeOut'],
  dismiss: {
    duration: 3000
  }
})

// Successful access requested to patient
export const ACCESS_REQUESTED = (isMobile: boolean) => ({
  title: 'Mensaje',
  message: 'Se solicitó acceso',
  type: 'success' as NOTIFICATION_TYPE,
  insert: (isMobile ? 'bottom' : 'top') as NOTIFICATION_INSERTION,
  container: (isMobile ? 'bottom-center' : 'top-right') as NOTIFICATION_CONTAINER,
  animationIn: ['animated', 'fadeIn'],
  animationOut: ['animated', 'fadeOut'],
  dismiss: {
    duration: 3000
  }
})

// Filters applied successfully message
export const FILTERS_APPLIED = (isMobile: boolean) => ({
  title: 'Mensaje',
  message: 'Filtros aplicados',
  type: 'success' as NOTIFICATION_TYPE,
  insert: (isMobile ? 'bottom' : 'top') as NOTIFICATION_INSERTION,
  container: (isMobile ? 'bottom-center' : 'top-right') as NOTIFICATION_CONTAINER,
  animationIn: ['animated', 'fadeIn'],
  animationOut: ['animated', 'fadeOut'],
  dismiss: {
    duration: 3000
  }
})
