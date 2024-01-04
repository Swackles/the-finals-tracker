import React, {ChangeEvent, ReactNode, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {getAuthenticationToken, saveAuthenticationToken} from "@common/util";
import {API} from "@common/sdk/finals-tracker/api";

export enum AuthMethod {
  NONE,
  JWT,
  JSON
}

export interface AuthContextProps {
  json: any | undefined,
  authMethod: AuthMethod,
  login: (jwt?: string, json?: any) => void
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

  useEffect(() => {
    const jwt = getAuthenticationToken()
    if (jwt != undefined) login(jwt)
  }, [])

  useEffect(() => {
    const resInterceptor = API.interceptors.response.use(
      res => {
        if (res.status === 401) {
          API.defaults.headers.Authorization = null
          saveAuthenticationToken()
          setAuthMethod(AuthMethod.NONE)
          setJson(undefined)
        }

        return res
      })

    return () => API.interceptors.response.eject(resInterceptor);
  }, [setAuthMethod, setJson])

  const login = useCallback((jwt?: string, json?: any) => {
    if (jwt) {
      API.defaults.headers.Authorization = `Bearer ${jwt}`
      setAuthMethod(AuthMethod.JWT)
    } else if (json) {
      setAuthMethod(AuthMethod.JSON)
      setJson(json)
    }
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
