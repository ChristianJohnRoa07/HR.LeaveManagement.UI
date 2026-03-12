import { useState } from 'react'
import { ArrowLeft } from 'lucide-react';

import '../css/RegisterPage.css'

import { useRouteNavigation } from '../../../utils/hooks/navigateRoute';


import { register } from '../../../services/authService';

function RegisterPage() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const { navigateToRoute } = useRouteNavigation();

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const result = await register(firstName, lastName, email, userName, password);

            if (result.creationStatus) {
                alert("Registration Successful! Please login your account.");

                navigateToRoute("/login");
            } else {
                setErrorMessage(result.errors);
            }

        } catch (err) {
            alert(`Connection Error: ${err}`);
        } finally {
            setLoading(false);
        }
    };

    const handleNavigate = () => {
        navigateToRoute("/login");
    }

    return (
        <div className="register-container">
            <div className="register-card">

                {/* Back Button positioned at the top */}
                <div className="back-nav">
                    <button type="button" onClick={handleNavigate} className="icon-button">
                        <ArrowLeft size={20} />
                    </button>
                </div>

                <h1>HR Leave Management System</h1>

                <div className="error-container" style={{ marginBottom: '15px' }}>
                    {errorMessage ? (
                        <ul style={{
                            color: '#b91c1c',
                            textAlign: 'left',
                            fontSize: '14px',
                            paddingLeft: '20px'
                        }}>
                            {/* If errorMessage is an array, map it. If it's a string, wrap it in an array first */}
                            {(Array.isArray(errorMessage) ? errorMessage : [errorMessage]).map((error, index) => (
                                <li key={index} style={{ marginBottom: '4px' }}>
                                    {error}
                                </li>
                            ))}
                        </ul>
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
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Last Name</label>
                        <input
                            type="lastName"
                            placeholder='Last Name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder='user@example.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="username"
                            placeholder='Username'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="button-group">
                        <button type="submit" disabled={loading}>
                            {loading ? "Please wait..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default RegisterPage;