
import AddressFields from "./components/AddressFields/AddressFields";

function App() {
  return (
    <div className="container main-app" >
      <AddressFields billState={true}/>
      <AddressFields />
    </div>
  );
}

export default App;
