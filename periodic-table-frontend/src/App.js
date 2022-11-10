import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PeriodicTable from "./components/PeriodicTable";
import Quiz from "./components/Quiz";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="App-Header">
          <NavBar />
        </div>
        <div className="App-Body">
          <Routes>
            <Route exact path="/" element={<PeriodicTable />} />
            <Route path="/periodic-table/quiz" element={<Quiz />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
