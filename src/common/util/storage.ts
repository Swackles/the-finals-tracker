enum Storage {
  AUTH = "auth"
}

export const getAuthenticationToken = () =>
  localStorage.getItem(Storage.AUTH)

export const saveAuthenticationToken = (token: string) =>
  localStorage.setItem(Storage.AUTH, token)
