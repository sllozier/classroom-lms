import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Dashboard from "./screens/Dashboard";
import Class from "./screens/Class";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/class/:id" element={<Class />} />
      </Routes>
    </div>
  );
}

export default App;
