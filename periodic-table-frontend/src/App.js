import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PeriodicTable from "./components/PeriodicTable";
import Quiz from "./components/QuizMode";
import "./App.css";
import NavBar from "./components/Navbar/NavBar";
import Login from "./components/UserAuth";
import { ToastContainer, toast } from "react-toastify";

function App() {
  let local = localStorage.getItem("user");
  console.log("local in appjs", local);
  return (
    <BrowserRouter>
      <div className="App">
        <div className="App-Header">
          <NavBar />
        </div>
        <div className="App-Body">
          <Routes>
            <Route exact path="/" element={<PeriodicTable />} />
            <Route path="/quiz" element={<Quiz user={local} />} />
            <Route path="/login" element={<Login user={local} />} />
            <Route path="*" element={<PeriodicTable />} />
          </Routes>
        </div>
      </div>
      <ToastContainer theme="dark" />
    </BrowserRouter>
  );
}

export default App;
