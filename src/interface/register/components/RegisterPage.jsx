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

    const { navigateToRoute } = useRouteNavigation();

    const handleRegister = async (e) => {

        e.preventDefault(); 

        setLoading(true);

        try {
            const registerResponse = await register(firstName, lastName, email, userName, password);

            const response = registerResponse.data;

            const registerStatus = response.creationStatus;

            if (registerStatus) {
                alert("Registration Successful! Please login your account.");

                navigateToRoute("/login");
            } else {
                const errorMessages = response.errors;
                alert("Registration Error:\n" + errorMessages);
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
                <p>Fill up necessary fields</p>

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