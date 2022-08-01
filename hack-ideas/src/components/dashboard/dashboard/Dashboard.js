/**@package Dashboard.js : Dashboard page contents

This file holds all the contents need to be displayed in the dashboard.It is the parent component holding child components.
**/
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import TopNavBar from '../topnavbar/TopNavBar';
import ChallengeContent from "../challenge/ChallengeContent"
import './Dashboard.css';

const Dashboard = () => {
    /**
     * Dahboard functional component holding other children components and required methods.
     */
    const auth = getAuth();
    const user = auth.currentUser;
    const history = useNavigate();


    useEffect(() => {
        /**
         * Hook used to be called only once when component is mounted.
         * Verifies if the user is accessing the dashboard without logging in by using the token stored in localstorage when logged in.
         */
        const token = localStorage.getItem("token");
        if (!token) {
            history("/")
        }
    }, [])

    return (
        <div>
            <TopNavBar userName={user ? user.displayName : null} />
            <ChallengeContent />
        </div>
    )
}

export default Dashboard;