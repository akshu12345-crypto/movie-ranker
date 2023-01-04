import './App.css';

import { Route, Routes } from 'react-router-dom';

import Dashboard from './admin/Dashboard';
import Login from './admin/Login';
import ProtectedRoutes from './functions/ProtectedRoutes';
import Home from './user/Home';

export default function App() {
  return (
    <Routes basename="/">
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Route>
      {/* <Route path="/EmailVerification" element={<EmailVerification />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
      <Route element={<ProtectedRoutes allowedRoles={[2, 3, 4, 5, 7, 8, 9]} />}>
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Route>
      <Route path="/*" element={<Unauthorized />} /> */}
    </Routes>
  );
}
