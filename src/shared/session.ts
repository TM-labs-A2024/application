function setSession(data: unknown) {
  if (typeof window !== 'undefined') localStorage?.setItem('session', JSON?.stringify(data))
}

function getSession() {
  if (typeof window !== 'undefined') return JSON?.parse(localStorage?.getItem('session') ?? '')
}

function removeSession() {
  if (typeof window !== 'undefined') localStorage?.removeItem('session')
}

export { setSession, getSession, removeSession }
