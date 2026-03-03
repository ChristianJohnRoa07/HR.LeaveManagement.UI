import React from 'react';
import {
    Clock,
    CheckCircle,
    AlertCircle,
    FileText, 
} from 'lucide-react';
import '../css/Dashboard.css';

import CustomSidebar from '../../sidebar/components/Sidebar';

const Dashboard = () => {
    // Mock data for the UI
    const stats = [
        { label: 'Total Leaves', value: '24', icon: <FileText color="#3b82f6" />, color: 'blue' },
        { label: 'Used Leaves', value: '10', icon: <CheckCircle color="#10b981" />, color: 'green' },
        { label: 'Pending', value: '2', icon: <Clock color="#f59e0b" />, color: 'orange' },
        { label: 'Sick Leave', value: '5', icon: <AlertCircle color="#ef4444" />, color: 'red' },
    ];

    return (
        <div className="dashboard-wrapper">
            {/* Sidebar */}
            <CustomSidebar />

            {/* Main Content */}
            <main className="main-content">
                <header className="top-nav">
                    <h2>Welcome back, Admin</h2>
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
            </main>
        </div>
    );
};

export default Dashboard;