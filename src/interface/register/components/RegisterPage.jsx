import { useState } from 'react'
import { ArrowLeft } from 'lucide-react';

import '../css/RegisterPage.css'

import { useRouteNavigation } from '../../../utils/hooks/navigateRoute';

function RegisterPage() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const { navigateToRoute } = useRouteNavigation();

    const handleRegister = async (e) => {

        e.preventDefault(); // Prevents the page from refreshing

        setLoading(true);

        try {
            // await login(email, password);
            alert("Login Successful! Check console for data.");
        } catch (err) {
            alert("Login Failed. Check your API connection.");
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
                            type="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Lastname</label>
                        <input
                            type="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>

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
                        <label>Username</label>
                        <input
                            type="username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
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