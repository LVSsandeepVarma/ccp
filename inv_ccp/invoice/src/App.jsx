import { BrowserRouter, Route, Routes } from "react-router-dom";
import InvoiceClient from "./components/clientInvoice";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id/:hash" element={<InvoiceClient/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
