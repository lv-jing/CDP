import React from 'react';

const GlobalContext = React.createContext();

const GlobalContextProvider = props => (
  <GlobalContext.Provider value={props.value}>
    {props.children}
  </GlobalContext.Provider>
);

export { GlobalContext, GlobalContextProvider };
