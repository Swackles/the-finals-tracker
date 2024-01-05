import React, {useCallback, useContext, useMemo, useState} from "react";

export enum AuthMethod {
  NONE,
  JSON
}

export interface AuthContextProps {
  json: any | undefined,
  authMethod: AuthMethod,
  login: (json?: any) => void
  profile: Profile | undefined
}

const AuthContext = React.createContext({
  authMethod: AuthMethod.NONE
} as AuthContextProps)

export interface Profile {
  embarkName?: string,
  steamName?: string
}

export const useAuthStore = () => useContext(AuthContext)

export interface AuthProviderProps {
  authenticatedView: () => JSX.Element
  unauthenticatedView: () => JSX.Element
}

export const AuthProvider = (props: AuthProviderProps) => {
  const [authMethod, setAuthMethod] = useState(AuthMethod.NONE)
  const [json, setJson] = useState<any | undefined>()
  const [profile, setProfile] = useState<Profile>()

  const login = useCallback((json: any) => {
    setAuthMethod(AuthMethod.JSON)
    setJson(json)
    setProfile(json.profile)
  }, [setAuthMethod, setJson])


  const value = useMemo(() => ({
    json,
    authMethod,
    login,
    profile
  }), [authMethod, login])

  return (
    <AuthContext.Provider value={value}>
      {authMethod === AuthMethod.NONE ? <props.unauthenticatedView /> : <props.authenticatedView />}
    </AuthContext.Provider>)
}
