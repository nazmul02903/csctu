import { createContext, useContext, useState } from "react";

const GlobalContenxt = createContext();
const initialState = {
  country: "",
  state: "",
  city: "",
  union: "",
  zipcode: "",
  village: "",

};

const ContextProvider = ({ children }) => {
  const [formState, setFormState] = useState({
    billing: initialState,
    shipping: initialState,
    billingOptions: {},
    shippingOptions: {},
  });
  const [showDefaultVal, setShowDefaultVal] = useState(false);
  return (
    <GlobalContenxt.Provider
      value={{ formState, setFormState, showDefaultVal, setShowDefaultVal }}
    >
      {children}
    </GlobalContenxt.Provider>
  );
};

export default ContextProvider;

export const GlobalStates = () => useContext(GlobalContenxt);
