import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Behavior_Points from "./components/Behavior_Points";
import Behavior_PointCreate from "./components/BehaviorPointCreate";
import Homepage from "./components/Homepage";
import Activity from "./components/Activity";
import ActivityCreate from "./components/ActivityCreate";
import Ac_his from "./components/Homepage";
import Ac_hisCreate from "./components/Homepage";
import Branch from "./components/Branch";
import BranchCreate from "./components/BranchCreate";
import Student from "./components/Homepage";
import StudentCreate from "./components/Homepage";
import TeacherShow from "./components/TeacherShow";
import TCeate from "./components/TCreate";
import SignIn from "./components/SignIn";
import Button from "@mui/material/Button";

export default function App() {
  const [token, setToken] = useState<String>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <SignIn />;
  }

  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
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
          <Route path="/TeacherShow" element={<TeacherShow />} />
          <Route path="/TCreate" element={<TCeate />} />
        </Routes>
      </div>
      <Button color="inherit" onClick={signout}>
        ออกจากระบบ
      </Button>
    </Router>
  );
}
