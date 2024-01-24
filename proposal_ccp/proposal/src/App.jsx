import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProposalClient from "./components/clientProposal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id/:hash" element={<ProposalClient/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
