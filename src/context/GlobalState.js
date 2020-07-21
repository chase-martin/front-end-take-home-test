import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  customer: {}
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function updateSearch(data) {
    console.log('updateSearch', data);
    dispatch({
      type: "UPDATE_SEARCH",
      payload: data,
    });
  }

  function resetSearch() {
    console.log('resetSearch');
    dispatch({
      type: "RESET_SEARCH",
      payload: '',
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        updateSearch,
        resetSearch,
        customer: state.customer,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};