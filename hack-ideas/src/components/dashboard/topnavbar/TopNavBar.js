import React from 'react'
import './TopNavBar.css'
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const TopNavBar = ({ userName }) => {
    /**
     * Top navigation bar component that displayes the Nav bar of the application.
     */
    const auth = getAuth();
    const history = useNavigate();

    const logout = () => {
        /**
         * Method to log out the logged in user.
         * Removes the user token from local storage when user logs out.
         */
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