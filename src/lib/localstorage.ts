export function setLocalStorage(key: string, data: unknown) {
  localStorage.setItem(key, JSON.stringify(data))
}

export function getLocalStorage(key: string) {
  const data = localStorage.getItem(key)

  if (data) {
    return JSON.parse(data)
  }
  return null
}

export function removeLocalStorage(key: string) {
  localStorage.removeItem(key)
}
