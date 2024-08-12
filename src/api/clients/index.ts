import axios from 'axios'

import { axiosClientConfig, axiosClientImageConfig } from './clients.constants'
import { AxiosAccessClientHandlers } from './clients.functions'

const axiosClient = axios.create(axiosClientConfig)

axiosClient.interceptors.request.use(AxiosAccessClientHandlers.handleRequest)

const axiosClientImage = axios.create(axiosClientImageConfig)

axiosClientImage.interceptors.request.use(AxiosAccessClientHandlers.handleRequest)

export { axiosClient, axiosClientImage }
