import React, { useEffect, useState, useCallback } from 'react';
import {
    House,
    CheckCircle,
    AlertOctagon,
    AlertCircle,
    FileText,
    Pen,
    Trash2,
    Trash,
    X,
} from 'lucide-react';
import '../css/Dashboard.css';

import { useDispatch, useSelector } from 'react-redux';

import { getUsername } from '../../../../services/userService';
import { getUserLeaveAllocations } from '../../../../services/leaveAllocationService';
import { getUserLeaveRequests, updateLeaveRequest, deleteLeaveRequest, cancelLeaveRequest } from '../../../../services/leaveRequestService';
import { getLeaveTypes } from '../../../../services/leaveTypeService';

import MainLayout from './MainLayout';
import UpdateLeaveModal from './UpdateLeaveModal';
import DeleteCancelLeaveModal from './DeleteCancelLeaveModal';


const Dashboard = () => {

    const dispatch = useDispatch();

    const { userName } = useSelector((state) => state.user);
    const { totalAllocatedDays, vacationDays, sickDays, leaveRequests, leaveTypes, isLoading } = useSelector((state) => state.leave);

    const [alert, setAlert] = useState({ message: '', type: 'error' });
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        request: null,
        type: 'delete', // 'delete' or 'cancel'
    });

    // Call user details immediately
    const fetchDashboardData = useCallback(() => {
        return Promise.all([
            dispatch(getUserLeaveAllocations()).unwrap(),
            dispatch(getUsername()).unwrap(),
            dispatch(getUserLeaveRequests()).unwrap(),
            dispatch(getLeaveTypes()).unwrap()
        ]).catch(err => {
            const msg = err?.message || "Failed to load dashboard data.";
            setAlert({ message: msg, type: 'error' });
        });
    }, [dispatch]);

    // Initial load
    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    const handleEdit = (request) => {
        setSelectedRequest(request);
        setIsEditModalOpen(true);
    };

    const handleUpdateSubmit = async (updatedData) => {
        try {
            const result = await dispatch(updateLeaveRequest(updatedData)).unwrap()
            setIsEditModalOpen(false);

            await fetchDashboardData();

            setAlert({ message: result?.message || result || "Update successful", type: 'success' });
        } catch (err) {
            const errorMessage = typeof err === 'object' ? (err.message || "An error occurred") : err;
            setAlert({ message: errorMessage, type: 'error' });
        }
    };

    const openConfirmModal = (request, actionType = 'delete') => {
        setModalConfig({
            isOpen: true,
            request: request,
            type: actionType
        });
    };

    const handleConfirmSubmit = async () => {
        const { request, type } = modalConfig;
        if (!request) return;

        let res = "";

        try {
            if (type === 'delete') {
                const result = await dispatch(deleteLeaveRequest(request.id)).unwrap();
                
                res = result?.message;
            } else if (type === 'cancel') {
                const result = await dispatch(cancelLeaveRequest(request.id)).unwrap();

                res = result?.message;
            }

            await fetchDashboardData();

            setModalConfig({ ...modalConfig, isOpen: false });
            setAlert({ message: res, type: 'success' });
        } catch (err) {
            const errorMessage = typeof err === 'object' ? (err.message || "An error occurred") : err;
            setAlert({ message: errorMessage, type: 'error' });
        }
    };

    const stats = [
        { label: 'Total Leaves', value: totalAllocatedDays, icon: <FileText color="#3b82f6" />, color: 'blue' },
        { label: 'Used Leaves', value: 0, icon: <CheckCircle color="#10b981" />, color: 'green' },
        { label: 'Vacation Leave', value: vacationDays, icon: <House color="#f59e0b" />, color: 'orange' },
        { label: 'Sick Leave', value: sickDays, icon: <AlertOctagon color="#ef4444" />, color: 'red' },
    ];

    return (
        <MainLayout alert={alert} setAlert={setAlert}>
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
                                    <th>Type</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Days</th>
                                    <th>Status</th>
                                    <th>Actions</th>
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
                                                <td className="actions-cell">
                                                    <div className="action-buttons">
                                                        <button
                                                            type="button"
                                                            className="btn-action edit"
                                                            title="Edit Request"
                                                            onClick={() => handleEdit(request)}
                                                            disabled={request.cancelled}
                                                        >
                                                            <Pen size={16} />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn-action cancel"
                                                            title="Cancel Request"
                                                            onClick={() => openConfirmModal(request, 'cancel')}
                                                            disabled={request.cancelled}
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn-action delete"
                                                            title="Delete Request"
                                                            onClick={() => openConfirmModal(request, 'delete')}
                                                        >
                                                            <Trash size={16} />
                                                        </button>
                                                    </div>
                                                </td>
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

            {selectedRequest && (
                <UpdateLeaveModal
                    request={selectedRequest}
                    leaveTypes={leaveTypes}
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={handleUpdateSubmit}
                />
            )}

            <DeleteCancelLeaveModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                onConfirm={handleConfirmSubmit}
                isLoading={isLoading}

                icon={modalConfig.type === 'delete' ? Trash2 : AlertCircle}
                iconColor={modalConfig.type === 'delete' ? "#dc2626" : "#f59e0b"}
                title={modalConfig.type === 'delete' ? "Delete Leave Request" : "Cancel Leave Request"}
                confirmText={modalConfig.type === 'delete' ? "Yes, Delete" : "Yes, Cancel"}
                confirmButtonClass={modalConfig.type === 'delete' ? "btn-danger" : "btn-warning"}

                message={
                    <p>
                        Are you sure you want to {modalConfig.type} this
                        <strong> {modalConfig.request?.leaveType?.name}</strong> request?
                    </p>
                }
            />
        </MainLayout>
    );
};

export default Dashboard;