import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import './Login.css'

const Login = () => {
    /**
     * Login component that displayes login page of the application.
     */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useNavigate();

    const onLogin = () => {
        /**
         * Method to log in user using user credentials.
         * Authenticates the user email Id , password and then redirects the user to Dashboard .
         * Storing the Token ID in the local storage to handle page refreshes.
         */
        setLoading(true);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                localStorage.setItem("token", userCredential._tokenResponse.idToken);
                history("/dashboard")
            })
            .catch((e) => alert(e.message))
            .finally(setLoading(false))
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            history("/dashboard")
        }
    }, [])

    return (
        <div className="login-page-main">
            <div className="login-div">
                <div className="login-form">
                    <span className="title">Login</span>

                    <div className="email-div">
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="input-box"
                            placeholder="Enter your email"
                        />

                    </div>
                    <div className="password-div">
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="input-box"
                        />
                    </div>
                    <div>
                        <button onClick={onLogin} className="login-btn">
                            {loading ? "Logging you in..." : "Login"}
                        </button>
                    </div>
                    <div>
                        <Link to="/signup">
                            Don't have an account?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;