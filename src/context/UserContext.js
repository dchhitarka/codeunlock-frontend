import React, { useContext, useState } from 'react'

const UserContext = React.createContext()

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({})

  return (
    <UserContext.Provider value={{ user, setUser: setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const { user, setUser } = useContext(UserContext)
  return { user, setUser }
}