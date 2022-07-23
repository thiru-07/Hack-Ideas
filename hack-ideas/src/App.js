import './App.css';
import React, { useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDIXYyDjRxsx4ER1cNXAaGFh8lu6mwP2Fc",
  authDomain: "hack-ideas-f9855.firebaseapp.com",
  projectId: "hack-ideas-f9855",
  storageBucket: "hack-ideas-f9855.appspot.com",
  messagingSenderId: "581988712215",
  appId: "1:581988712215:web:9a1b791cbb445ed5884152"
};

initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      setUser(user)
    })
  }, [])
  return (
    <div className="App">
      <BrowserRouter >
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
