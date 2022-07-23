import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth'
import './Dashboard.css'

const Dashboard = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const history = useNavigate();

    const logout = () => {
        // localStorage.removeItem("token")
        // history("/")
        signOut(auth)
            .then(() => {
                localStorage.removeItem("token")
                history("/")
            })
            .catch((e) => alert(e.message))
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            history("/")
        }
    }, [])



    return (
        < div className="login-page-main" >
            <div className="login-div">
                <p>{user && user.displayName}</p>
                <div>
                    <button onClick={logout} className="">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;