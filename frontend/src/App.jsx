import { BrowserRouter, Routes, Route } from "react-router";
import reactLogo from "./assets/react.svg";


import "./App.css";
import { Dashboard } from "./components/dashboard";
import { Detail } from "./components/detail";

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>
          <img src={reactLogo} />
          Finary 2.0
        </h1>
      </header>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path=":id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
