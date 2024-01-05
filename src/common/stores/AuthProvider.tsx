import React, {useCallback, useContext, useMemo, useState} from "react";

export enum AuthMethod {
  NONE,
  JSON
}

export interface AuthContextProps {
  json: any | undefined,
  authMethod: AuthMethod,
  login: (json?: any) => void
}

const AuthContext = React.createContext({
  authMethod: AuthMethod.NONE
} as AuthContextProps)

export const useAuthStore = () => useContext(AuthContext)

export interface AuthProviderProps {
  authenticatedView: () => JSX.Element
  unauthenticatedView: () => JSX.Element
}

export const AuthProvider = (props: AuthProviderProps) => {
  const [authMethod, setAuthMethod] = useState(AuthMethod.NONE)
  const [json, setJson] = useState<any | undefined>()

  const login = useCallback((json: any) => {
    setAuthMethod(AuthMethod.JSON)
    setJson(json)
  }, [setAuthMethod, setJson])


  const value = useMemo(() => ({
    json,
    authMethod,
    login
  }), [authMethod, login])

  return (
    <AuthContext.Provider value={value}>
      {authMethod === AuthMethod.NONE ? <props.unauthenticatedView /> : <props.authenticatedView />}
    </AuthContext.Provider>)
}
