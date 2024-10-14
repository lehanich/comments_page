import React, {useContext} from 'react'

// interface CurrentUserContextType {
//   username: string;
// }

const AuthContext = React.createContext(null)

export type AuthProviderProps = {
  readonly value?: any;
  readonly children?: any;
}

export function AuthProvider({children, value}: AuthProviderProps) {
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthValue(){
  return useContext(AuthContext)
}