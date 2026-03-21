import { useState } from 'react'
import { ArrowLeft } from 'lucide-react';

import '../css/RegisterPage.css'

import { useRouteNavigation } from '../../../utils/hooks/navigateRoute';

import { useDispatch, useSelector } from 'react-redux';
import { handleRegisterFormField, clearRegisterForm } from '../../../features/auth/authSlice'
import { register } from '../../../services/authService';
import Alert from '../../../interface/common/error/component/Alert';

function RegisterPage() {

    const { registerForm, isLoading } = useSelector((state) => state.auth);
    const [alert, setAlert] = useState({ message: '', type: 'error' });

    const { navigateToRoute } = useRouteNavigation();

    const dispatch = useDispatch();

    const handleRegisterChange = (e) => {
        dispatch(handleRegisterFormField({ field: e.target.name, value: e.target.value }));
    }

    const handleRegister = async (e) => {

        e.preventDefault();

        let firstName = registerForm.firstName;
        let lastName = registerForm.lastName;
        let email = registerForm.email;
        let username = registerForm.username;
        let password = registerForm.password;

        try {

            await dispatch(register({ firstName, lastName, email, username, password })).unwrap();


            setAlert({
                message: "User registration successful!",
                type: 'success'
            });

        } catch (err) {
            const formattedError = Array.isArray(err)
                ? err.join("\n")
                : (err.message || "An unexpected error occurred.");

            setAlert({
                message: formattedError,
                type: 'error'
            });
        } 
    };

    const handleNavigate = () => {
        navigateToRoute("/login");
        dispatch(clearRegisterForm());
    }

    return (
        <div className="register-container">
            <div className="register-card">

                <div className="back-nav">
                    <button type="button" onClick={handleNavigate} className="icon-button">
                        <ArrowLeft size={20} />
                    </button>
                </div>

                <h1>HR Leave Management System</h1>

                <div className="error-container" style={{ marginBottom: '15px' }}>
                    {alert.message ? (
                        <Alert
                            message={alert.message}
                            type={alert.type}
                            onClose={() => setAlert({ ...alert, message: '' })}
                        />
                    ) : (
                        <p style={{ fontSize: '14px', color: '#666' }}>Please fill up necessary fields</p>
                    )}
                </div>

                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <label>Firstname</label>
                        <input
                            type="First Name"
                            placeholder='First Name'
                            name="firstName"
                            value={registerForm.firstName}
                            onChange={handleRegisterChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Last Name</label>
                        <input
                            type="lastName"
                            placeholder='Last Name'
                            name="lastName"
                            value={registerForm.lastName}
                            onChange={handleRegisterChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder='user@example.com'
                            name="email"
                            value={registerForm.email}
                            onChange={handleRegisterChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="username"
                            placeholder='Username'
                            name="username"
                            value={registerForm.username}
                            onChange={handleRegisterChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder='Password'
                            name="password"
                            value={registerForm.password}
                            onChange={handleRegisterChange}
                            required
                        />
                    </div>

                    <div className="button-group">
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? "Please wait..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default RegisterPage;