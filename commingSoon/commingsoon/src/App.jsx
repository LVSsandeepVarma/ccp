import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CommingSoon from './CommingSoon';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CommingSoon />}></Route>
        </Routes>
        </BrowserRouter>
      
    </>
  )
}

export default App
