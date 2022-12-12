import React, { createContext, FC } from 'react'

export interface IContextProps {
  dbList: string[]
}

export const AppContext = createContext<IContextProps>({ dbList: [] })

export const AppContextProvider: FC<any> = ({ children }) => {
  const value: IContextProps = { dbList: [] }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
