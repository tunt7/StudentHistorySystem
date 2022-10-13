import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Behavior_Points from "./components/Behavior_Points";
import BHCreate from "./components/BHCreate";
import Homepage from "./components/Homepage";
import Test from "./components/TestApi";
export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/behavior_points" element={<Behavior_Points />} />
          <Route path="/bhcreate" element={<BHCreate />} />
          <Route path="/testapi" element={<Test />} />
        </Routes>
      </div>
    </Router>
  );
}
