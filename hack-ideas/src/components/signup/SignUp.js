import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useNavigate();

    const onSignUp = () => {
        setLoading(true);
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                updateProfile(auth.currentUser, { displayName: name })
                    .then(() => history("/"))
                    .catch((e) => alert(e.message))
            }).catch((e) => alert(e.message))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            history("/dashboard")
        }
    }, [])

    return (
        < div className="login-page-main" >
            <div className="login-div">
                <div className="title">SignUp Page</div>
                <div className="form">
                    <div className="email">
                        <label>Username</label>
                        <input
                            type="name"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="email">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="pass">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button onClick={onSignUp} className="btn btn-">
                            {loading ? 'Creating user...' : "SignUp"}
                        </button>
                    </div>
                    <div>
                        <Link to="/">
                            Already have an account?
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SignUp;