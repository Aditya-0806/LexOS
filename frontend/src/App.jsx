import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ThreatRadar from './pages/ThreatRadar'
import ShieldMode from './pages/ShieldMode'
import QuickComplaint from './pages/QuickComplaint'
import ForgeScan from './pages/ForgeScan'


function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      <Route path="/threatradar" element={user ? <ThreatRadar /> : <Navigate to="/login" />} />
      <Route path="/shieldmode" element={user ? <ShieldMode /> : <Navigate to="/login" />} />
      <Route path="/quickcomplaint" element={user ? <QuickComplaint /> : <Navigate to="/login" />} />
      
<Route path="/forgescan" element={user ? <ForgeScan /> : <Navigate to="/login" />} />


    </Routes>
  )
}


// Inside Routes add:
export default App