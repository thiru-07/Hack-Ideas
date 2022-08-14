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
        < div className="signup-page-main" >
            <div className="signup-div">
                <div className="title">SignUp</div>
                <div className="signup-form">
                    <div className="email">
                        <input
                            type="username-div"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="input-box"
                        />
                    </div>
                    <div className="email-div">
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="input-box"
                        />
                    </div>
                    <div className="password-div">
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter your email"
                            className="input-box"
                        />
                    </div>
                    <div>
                        <button onClick={onSignUp} className="signup-btn">
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