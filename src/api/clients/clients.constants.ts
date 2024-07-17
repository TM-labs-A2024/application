const isNotServer = typeof window !== 'undefined'

export const axiosClientConfig = {
  baseURL: process?.env?.NEXT_PUBLIC_API_URL ?? '',
  token: isNotServer && (localStorage.getItem('token') ?? ''),
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${isNotServer && (localStorage.getItem('token') ?? '')}`
  }
}
