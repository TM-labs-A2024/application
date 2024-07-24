import { getToken } from '@src/shared'

export const AxiosAccessClientHandlers = {
  handleRequest: (config) => {
    const token = getToken()
    config.headers.Authorization = token ? `Bearer ${token}` : ''

    return config
  }
}
