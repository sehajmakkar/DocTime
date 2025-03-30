import { createContext } from 'react';

export const AppContext = createContext();

const AppContextProvider = ( props ) => {
  const calculateAge = ( dateOfBirth ) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  }

  const value = {
    calculateAge
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;