import React, { useEffect, useState } from 'react';
import {
    House,
    CheckCircle,
    AlertOctagon,
    FileText,
} from 'lucide-react';
import '../css/Dashboard.css';

import { useDispatch, useSelector } from 'react-redux';

import { getUserLeaveAllocations, getUsername } from '../../../../services/userService';
import { useRouteNavigation } from '../../../../utils/hooks/navigateRoute';
import { handleCookie } from '../../../../utils/hooks/handleCookie';
import { logout } from '../../../../services/authService';

import CustomSidebar from '../../sidebar/components/Sidebar';


const Dashboard = () => {

    const dispatch = useDispatch();

    const { navigateToRoute } = useRouteNavigation();
    const { deleteCookie } = handleCookie();

    const [errorMessage, setErrorMessage] = useState("");

    const { userName, totalAllocatedDays, vacationDays, sickDays, isLoading } = useSelector((state) => state.user);

    // Call user details immediately
    useEffect(() => {
        dispatch(getUserLeaveAllocations()).unwrap();
        dispatch(getUsername()).unwrap();
    }, [dispatch]);

    const handleLogout = async () => {

        const response = await logout();

        if (response.status) {
            setErrorStatus(false);
            deleteCookie();
            navigateToRoute("/login");
        }
        else {
            setErrorStatus(true);
            setErrorMessage(response.message);
        }
    }

    const stats = [
        { label: 'Total Leaves', value: totalAllocatedDays, icon: <FileText color="#3b82f6" />, color: 'blue' },
        { label: 'Used Leaves', value: 0, icon: <CheckCircle color="#10b981" />, color: 'green' },
        { label: 'Vacation Leave', value: vacationDays, icon: <House color="#f59e0b" />, color: 'orange' },
        { label: 'Sick Leave', value: sickDays, icon: <AlertOctagon color="#ef4444" />, color: 'red' },
    ];

    return (
        <div className="dashboard-wrapper">
            {/* Sidebar */}
            <CustomSidebar handleLogout={handleLogout} />

            {/* Main Content */}
            <main className="main-content">

                {errorMessage && (
                    <div className="alert alert-danger" style={{
                        backgroundColor: '#fee2e2',
                        color: '#b91c1c',
                        padding: '10px',
                        borderRadius: '5px',
                        marginBottom: '10px'
                    }}>
                        <strong>Error: </strong> {errorMessage}
                    </div>
                )}

                {isLoading ? (
                    /* --- LOADING STATE --- */
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p style={{ marginTop: '10px', color: '#64748b' }}>Fetching your leave details...</p>
                    </div>
                ) : (
                    <div>
                        <header className="top-nav">
                            <h2>Welcome back, {userName}!</h2>
                            <div className="user-profile">
                                <img src="https://ui-avatars.com/api/?name=Admin+User" alt="Avatar" />
                            </div>
                        </header>

                        {/* Stats Grid */}
                        <section className="stats-grid">
                            {stats.map((stat, index) => (
                                <div key={index} className={`stat-card ${stat.color}`}>
                                    <div className="stat-icon">{stat.icon}</div>
                                    <div className="stat-info">
                                        <h3>{stat.value}</h3>
                                        <p>{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </section>

                        {/* Recent Requests Table */}
                        <section className="table-container">
                            <h3>Recent Leave Requests</h3>
                            <table className="leave-table">
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Days</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Annual Leave</td>
                                        <td>Mar 10, 2026</td>
                                        <td>Mar 15, 2026</td>
                                        <td>5</td>
                                        <td><span className="badge pending">Pending</span></td>
                                    </tr>
                                    <tr>
                                        <td>Sick Leave</td>
                                        <td>Feb 20, 2026</td>
                                        <td>Feb 21, 2026</td>
                                        <td>1</td>
                                        <td><span className="badge approved">Approved</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </div>
                )}


            </main>
        </div>
    );
};

export default Dashboard;