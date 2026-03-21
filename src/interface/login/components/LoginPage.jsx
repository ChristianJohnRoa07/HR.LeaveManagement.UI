import { useState, useEffect } from 'react'
import '../css/LoginPage.css'

import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../../services/authService'

import { handleLoginFormField, clearLoginForm, clearError } from '../../../features/auth/authSlice'

import { useRouteNavigation } from '../../../utils/hooks/navigateRoute';

import Alert from '../../../interface/common/error/component/Alert';

function LoginPage() {

    const dispatch = useDispatch();

    const { navigateToRoute } = useRouteNavigation();

    const { loginForm, user, isLoading } = useSelector((state) => state.auth);

    const [alert, setAlert] = useState({ message: '', type: 'error' });

    // Successful login navigate to dashboard
    useEffect(() => {
        if (user) {
            navigateToRoute("/dashboard");
        }
    }, [user, navigateToRoute])

    const handleLoginChange = (e) => {
        dispatch(handleLoginFormField({ field: e.target.name, value: e.target.value }));
    }

    const handleLogin = async (e) => {

        e.preventDefault(); // Prevents the page from refreshing

        try {
            let email = loginForm.email;
            let password = loginForm.password;

            // .unwrap() allows you to treat the thunk like a normal promise
            // It will throw an error if the thunk returns rejectWithValue
            await dispatch(login({ email, password })).unwrap();

            // cleanInputs();

        } catch (error) {
            const errorMessage = typeof error === 'object'
                ? (error.message || "Invalid credentials. Please try again.")
                : error;

            setAlert({
                message: errorMessage,
                type: 'error'
            });

            dispatch(handleLoginFormField({ field: 'password', value: '' }));
        }
    };

    const handleNavigate = () => {
        navigateToRoute("/register");
        dispatch(clearError());

        cleanInputs();
    }

    const cleanInputs = () => {
        dispatch(clearLoginForm());
    }

    return (
        <div className="login-container">
            <div className="login-card">

                <h1>HR Leave Management System</h1>
                {alert.message ? (
                    <Alert
                        message={alert.message}
                        type={alert.type}
                        onClose={() => setAlert({ ...alert, message: '' })}
                    />
                ) : (
                    <p>Please enter your credentials</p>
                )}

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            name="email"
                            type="email"
                            value={loginForm.email}
                            onChange={handleLoginChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            value={loginForm.password}
                            onChange={handleLoginChange}
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