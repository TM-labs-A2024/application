import { formatDate } from './dates'
import { sendEmail, generateVerificationCode, setupEmailSending } from './email'
import { setupErrorNotification } from './notifications'
import { isWeb, isIOS, isAndroid, isMobile } from './platform'

export {
  isWeb,
  isIOS,
  isAndroid,
  isMobile,
  sendEmail,
  generateVerificationCode,
  setupEmailSending,
  setupErrorNotification,
  formatDate
}
