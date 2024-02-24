import "./App.css";

import { Route, Routes } from "react-router-dom";

import Dashboard from "./admin/Dashboard";
import Login from "./admin/Login";
import ProtectedRoutes from "./functions/ProtectedRoutes";

export default function App() {
  return (
    <Routes basename="/">
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
