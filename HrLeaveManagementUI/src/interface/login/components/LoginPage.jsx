import { useState } from 'react'
import '../css/LoginPage.css'

import { login } from '../../../services/authService'

import { useRouteNavigation } from '../../../utils/hooks/navigateRoute';



function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { navigateToRoute } = useRouteNavigation();

    const handleLogin = async (e) => {

        e.preventDefault(); // Prevents the page from refreshing

        setLoading(true);

        try {
            await login(email, password);
            alert("Login Successful! Check console for data.");
        } catch (err) {
            alert("Login Failed. Check your API connection.");
        } finally {
            setLoading(false);
        }
    };

    const handleNavigate = () => {
        navigateToRoute("/register");
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>HR Leave Management System</h1>
                <p>Please enter your credentials</p>

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