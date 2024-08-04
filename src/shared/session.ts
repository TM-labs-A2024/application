import { Doctor, Institution, Nurse, Patient } from '@src/types'

function setSession(
  data: string,
  token?: string,
  user?: Patient | Doctor | Nurse | Institution | string
) {
  if (typeof window !== 'undefined') {
    localStorage?.setItem('session', JSON?.stringify(data))
    localStorage?.setItem('token', JSON?.stringify(token))
    localStorage?.setItem('user', JSON?.stringify(user))
  }
}

function getSession() {
  if (typeof window !== 'undefined') return JSON?.parse(localStorage?.getItem('session') ?? '')
}

function getToken() {
  if (typeof window !== 'undefined') return JSON?.parse(localStorage?.getItem('token') ?? '')
}

function getUser() {
  if (typeof window !== 'undefined') return JSON?.parse(localStorage?.getItem('user') ?? '')
}

function removeSession() {
  if (typeof window !== 'undefined') {
    localStorage?.removeItem('session')
    localStorage?.removeItem('token')
    localStorage?.removeItem('user')
  }
}

export { setSession, getSession, getToken, removeSession, getUser }
