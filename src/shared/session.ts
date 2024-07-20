function setSession(data: string, token?: string) {
  if (typeof window !== 'undefined') {
    localStorage?.setItem('session', JSON?.stringify(data))
    localStorage?.setItem('token', JSON?.stringify(token))
  }
}

function getSession() {
  if (typeof window !== 'undefined') return JSON?.parse(localStorage?.getItem('session') ?? '')
}

function getToken() {
  if (typeof window !== 'undefined') return JSON?.parse(localStorage?.getItem('token') ?? '')
}

function removeSession() {
  if (typeof window !== 'undefined') localStorage?.removeItem('session')
}

export { setSession, getSession, getToken, removeSession }
