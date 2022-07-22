// import logo from './logo.svg';
import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Dashboard from './components/dashboard/Dashboard';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
