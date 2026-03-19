import { useState, useEffect } from 'react'
import '../css/LoginPage.css'

import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../../services/authService'

import { clearError } from '../../../features/auth/authSlice'

import { useRouteNavigation } from '../../../utils/hooks/navigateRoute';

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();

    const { navigateToRoute } = useRouteNavigation();

    const { user, isLoading, loginError } = useSelector((state) => state.auth)

    // Successful login navigate to dashboard
    useEffect(() => {
        if (user) {
            navigateToRoute("/dashboard");
        }
    }, [user, navigateToRoute])

    // Encountered an error
    useEffect(() => {
        if (loginError) {
            setErrorMessage(loginError);
        }

        return () => {
            dispatch(clearError());
        };
    }, [loginError, dispatch])

    const handleLogin = async (e) => {

        e.preventDefault(); // Prevents the page from refreshing

        try {
            // .unwrap() allows you to treat the thunk like a normal promise
            // It will throw an error if the thunk returns rejectWithValue
            await dispatch(login({ email, password })).unwrap();

            cleanInputs();

        } catch (rejectedValueOrError) {
            setPassword('');
        }
    };

    const handleNavigate = () => {
        navigateToRoute("/register");
        dispatch(clearError());
    }

    const cleanInputs = () => {
        setEmail('');
        setPassword('');
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value);
        if (errorMessage) setErrorMessage("");
    };

    return (
        <div className="login-container">
            <div className="login-card">

                <h1>HR Leave Management System</h1>
                {errorMessage ? (
                    <p style={{ color: '#b91c1c' }}>{errorMessage}</p>
                ) : (
                    <p>Please enter your credentials</p>
                )}

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={onEmailChange}
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

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Authenticating..." : "Login"}
                    </button>

                </form>

                <div className="separator">
                    <span>OR</span>
                </div>

                <div className="button-register">
                    <button onClick={handleNavigate} disabled={isLoading}>
                        {"Register"}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default LoginPage