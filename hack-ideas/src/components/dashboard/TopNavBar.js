import React from 'react'
import './Dashboard.css'
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const TopNavBar = ({ userName }) => {
    const auth = getAuth();
    const history = useNavigate();

    const logout = () => {
        signOut(auth)
            .then(() => {
                localStorage.removeItem("token")
                history("/")
            })
            .catch((e) => alert(e.message))
    }

    return (
        <nav className="top-nav-bar">
            <div className="username">Welcome {userName} !</div>
            <button onClick={logout} className="sign-out-btn">Sign Out</button>
        </nav>
    )
}

export default TopNavBar