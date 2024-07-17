import axios from 'axios'

import { axiosClientConfig } from './clients.constants'

const axiosClient = axios.create(axiosClientConfig)

export { axiosClient }
