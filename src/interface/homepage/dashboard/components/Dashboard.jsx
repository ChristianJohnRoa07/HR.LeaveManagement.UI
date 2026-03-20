import React, { useEffect, useState } from 'react';
import {
    House,
    CheckCircle,
    AlertOctagon,
    FileText,
} from 'lucide-react';
import '../css/Dashboard.css';

import { useDispatch, useSelector } from 'react-redux';

import { getUsername } from '../../../../services/userService';
import { getUserLeaveAllocations } from '../../../../services/leaveAllocationService';
import { getUserLeaveRequests } from '../../../../services/leaveRequestService';

import MainLayout from './MainLayout';


const Dashboard = () => {

    const dispatch = useDispatch();

    const { userName } = useSelector((state) => state.user);
    const { totalAllocatedDays, vacationDays, sickDays, leaveRequests, isLoading } = useSelector((state) => state.leave);

    const [errorMessage, setErrorMessage] = useState("");

    // Call user details immediately
    useEffect(() => {
        Promise.all([
            dispatch(getUserLeaveAllocations()).unwrap(),
            dispatch(getUsername()).unwrap(),
            dispatch(getUserLeaveRequests()).unwrap()
        ]).catch(err => setErrorMessage("Failed to load dashboard data."));
    }, [dispatch]);

    const stats = [
        { label: 'Total Leaves', value: totalAllocatedDays, icon: <FileText color="#3b82f6" />, color: 'blue' },
        { label: 'Used Leaves', value: 0, icon: <CheckCircle color="#10b981" />, color: 'green' },
        { label: 'Vacation Leave', value: vacationDays, icon: <House color="#f59e0b" />, color: 'orange' },
        { label: 'Sick Leave', value: sickDays, icon: <AlertOctagon color="#ef4444" />, color: 'red' },
    ];

    return (
        <MainLayout errorMessage={errorMessage} setErrorMessage={setErrorMessage}>
            {isLoading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p style={{ marginTop: '10px', color: '#64748b' }}>Fetching your leave details...</p>
                </div>
            ) : (
                <>
                    <header className="top-nav">
                        <h2>Welcome back, {userName}!</h2>
                        <div className="user-profile">
                            <img src={`https://ui-avatars.com/api/?name=${userName}`} alt="Avatar" />
                        </div>
                    </header>

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

                    <section className="table-container">
                        <h3>Recent Leave Requests</h3>
                        <table className="leave-table">
                            <thead>
                                <tr>
                                    <th>Type</th><th>From</th><th>To</th><th>Days</th><th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaveRequests?.length > 0 ? (
                                    leaveRequests.map((request) => {
                                        const status = request.approved ? { label: "Approved", class: "approved" } :
                                            request.cancelled ? { label: "Cancelled", class: "cancelled" } :
                                                { label: "Pending", class: "pending" };

                                        const diffDays = Math.ceil(Math.abs(new Date(request.endDate) - new Date(request.startDate)) / (1000 * 60 * 60 * 24)) || 1;

                                        return (
                                            <tr key={request.id}>
                                                <td>{request.leaveType?.name || "N/A"}</td>
                                                <td>{new Date(request.startDate).toLocaleDateString()}</td>
                                                <td>{new Date(request.endDate).toLocaleDateString()}</td>
                                                <td>{diffDays}</td>
                                                <td><span className={`badge ${status.class}`}>{status.label}</span></td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr><td colSpan="5" className="no-data-cell">No leave requests found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </section>
                </>
            )}
        </MainLayout>
    );
};

export default Dashboard;