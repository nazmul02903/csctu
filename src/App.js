import AddressFields from "./components/AddressFields/AddressFields";
import { GlobalStates } from "./context";

function App() {
  const { formState } = GlobalStates();
  console.log(formState);
  return (
    <div className="container main-app">
      <AddressFields billState={true} />
      <AddressFields />
    </div>
  );
}

export default App;
