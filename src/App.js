import { useEffect } from "react";
import AddressFields from "./components/AddressFields/AddressFields";
import { GlobalStates } from "./context";

function App() {
  const {
    formState: { billing, shipping , shippingOptions},
    formState,
    setFormState,
    showDefaultVal
  } = GlobalStates();

  const stateArr = [
    "country",
    "state",
    "district",
    "city",
    "union",
    "zipcode",
    "village",
  ];



  useEffect(() => {
    stateArr.forEach((each, i) => {
      if (shipping[each] === "") {
        for (let j = i; j <= stateArr.length; j++) {
           const formVal = { ...formState };
           formVal.shippingOptions[stateArr[j]] = {};
           setFormState(formVal);
        }
      }
    });
  }, [shipping]);

  console.log(shipping);


  useEffect(() => {
    stateArr.forEach((each, i) => {
      if (billing[each] === "") {
        for (let j = i; j <= stateArr.length; j++) {
          const formVal = { ...formState };
          formVal.billingOptions[stateArr[j]] = {};
          setFormState(formVal);
        }
      }
    });
  }, [billing]);


  return (
    <div className="container main-app">
      <AddressFields billState={true} />
      <AddressFields />
    </div>
  );
}

export default App;
