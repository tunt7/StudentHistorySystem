import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Behavior_Points from "./components/Behavior_Points";
import BehaviorPointCreate from "./components/BehaviorPointCreate";
import Homepage from "./components/Homepage";
import Activity from "./components/Activity";
import ActivityCreate from "./components/ActivityCreate";
import Ac_his from "./components/Homepage";
import Ac_hisCreate from "./components/Homepage";
import Branch from "./components/Homepage";
import BranchCreate from "./components/Homepage";
import Student from "./components/Homepage";
import StudentCreate from "./components/Homepage";
import Teacher from "./components/Homepage";
import TeacherCreate from "./components/Homepage";
export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Activity" element={<Activity />} />
          <Route path="/ActivityCreate" element={<ActivityCreate />} />
          <Route path="/Ac_his" element={<Ac_his />} />
          <Route path="/Ac_hisCreate" element={<Ac_hisCreate />} />
          <Route path="/Behavior_points" element={<Behavior_Points />} />
          <Route path="/Behavior_pointsCreate" element={<Behavior_PointCreate />} />
          <Route path="/Branch" element={<Branch />} />
          <Route path="/BranchCreate" element={<BranchCreate />} />
          <Route path="/Student" element={<Student />} />
          <Route path="/StudentCreate" element={<StudentCreate />} />
          <Route path="/Teacher" element={<Teacher />} />
          <Route path="/TeacherCreate" element={<TeacherCreate />} />
        </Routes>
      </div>
    </Router>
  );
}
