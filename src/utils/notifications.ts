import { GENERIC_ERROR } from '@constants/index'
import { isMobile } from '@utils/index'
import { Store } from 'react-notifications-component'

export const setupErrorNotification = () => {
  Store.addNotification(
    GENERIC_ERROR(
      'Algo salió mal, por favor recargue la página e inténtelo de nuevo.',
      isMobile(window)
    )
  )
}
