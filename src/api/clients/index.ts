import axios from 'axios'

import { axiosClientConfig } from './clients.constants'
import { AxiosAccessClientHandlers } from './clients.functions'

const axiosClient = axios.create(axiosClientConfig)

axiosClient.interceptors.request.use(AxiosAccessClientHandlers.handleRequest)

export { axiosClient }
