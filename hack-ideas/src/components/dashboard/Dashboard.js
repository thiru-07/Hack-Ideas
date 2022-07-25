import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import TopNavBar from './TopNavBar'
import ChallengeContent from "./ChallengeContent"
import './Dashboard.css';

const Dashboard = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const history = useNavigate();


    useEffect(() => {
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