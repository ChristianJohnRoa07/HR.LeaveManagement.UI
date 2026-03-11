import { useState } from 'react'
import '../css/LoginPage.css'

import { login } from '../../../services/authService'

import { useRouteNavigation } from '../../../utils/hooks/navigateRoute';



function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const { navigateToRoute } = useRouteNavigation();

    const handleLogin = async (e) => {

        e.preventDefault(); // Prevents the page from refreshing

        setLoading(true);

        var loginStatus = await login(email, password);

        if (loginStatus.success) {
            navigateToRoute("/dashboard");
            cleanInputs();
        }
        else {

            cleanUinUponError();

            var message = loginStatus.message;

            setErrorMessage(message);
        }
    };

    const handleNavigate = () => {
        navigateToRoute("/register");
    }

    const cleanInputs = () => {
        setEmail('');
        setPassword('');
        setErrorMessage('');
        setLoading(false);
    }

    const cleanUinUponError = () => {
        setLoading(false);
    }

    return (
        <div className="login-container">
            <div className="login-card">

                <h1>HR Leave Management System</h1>
                {errorMessage ? (
                    <p style={{color: '#b91c1c'}}>{errorMessage}</p>
                ) : (
                    <p>Please enter your credentials</p>
                )}

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Authenticating..." : "Login"}
                    </button>

                </form>

                <div className="separator">
                    <span>OR</span>
                </div>

                <div className="button-register">
                    <button onClick={handleNavigate} disabled={loading}>
                        {"Register"}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default LoginPage