import { useDispatch } from "react-redux";
import { setTokenAction } from "../features/userSlice";
import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  token: null,
  setToken: () => {},
});

export const ContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

  const setToken = (newToken) => {
    _setToken(newToken);
    if (newToken) {
      localStorage.setItem("ACCESS_TOKEN", newToken);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <StateContext.Provider
      value={{
        setToken,
        token,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);
