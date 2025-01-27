import logo from './logo.svg';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import Login from './modules/login';
import Signup from './modules/signup';
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './modules/dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to='/login' replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}


export default App;
