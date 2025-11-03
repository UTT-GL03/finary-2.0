import {  Routes, Route, Link, BrowserRouter } from "react-router";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Dashboard } from "./components/dashboard";
import { Detail } from "./components/detail";
import { Incomes } from "./components/incomes";
import { Outcomes } from "./components/outcomes";
import "@picocss/pico/css/pico.css";

function App() {
  return (
    <BrowserRouter>
      <header>
        <Link to="/">
          <h1>
            <img src={reactLogo} alt="React logo" />
            Finary 2.0
          </h1>
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/incomes" element={<Incomes />} />
        <Route path="/outcomes" element={<Outcomes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
