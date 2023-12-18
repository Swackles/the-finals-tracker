enum Storage {
  AUTH = "auth"
}

export const getAuthenticationToken = () =>
  localStorage.getItem(Storage.AUTH)

export const saveAuthenticationToken = (token?: string) => {
  if (token === undefined) localStorage.removeItem(Storage.AUTH)
  else localStorage.setItem(Storage.AUTH, token)
}

