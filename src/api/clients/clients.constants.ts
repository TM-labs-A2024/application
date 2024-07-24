export const axiosClientConfig = {
  baseURL: process?.env?.NEXT_PUBLIC_API_URL ?? '',
  headers: {
    'Content-Type': 'application/json'
  }
}
