import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import './Login.css'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useNavigate();

    const onLogin = () => {
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
                <div className="title">Login Page</div>
                <div className="form">
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
                        <button onClick={onLogin} className="btn btn-">
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