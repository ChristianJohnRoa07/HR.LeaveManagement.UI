import React, { useState, useEffect } from 'react';
import { Calendar, FileText, Send, XCircle } from 'lucide-react';
import MainLayout from './MainLayout';
import '../css/ApplyLeave.css';

import { useDispatch, useSelector } from 'react-redux';
import { getLeaveTypes } from '../../../../services/leaveTypeService';
import { applyLeaveRequest } from '../../../../services/leaveRequestService';
import { handleCreateFormField } from '../../../../features/leave/leaveSlice';

const ApplyLeave = () => {
    const dispatch = useDispatch();

    const { createLeaveForm, leaveTypes, isLoading } = useSelector((state) => state.leave);

    const [alert, setAlert] = useState({ message: '', type: 'error' });

    useEffect(() => {
        if (leaveTypes.length === 0) {
            Promise.all([
                dispatch(getLeaveTypes()).unwrap(),
            ]).catch(err => setAlert({ message: "Failed to load dashboard data.", type: 'error' }));
        }
    }, [leaveTypes.length, dispatch]);

    const handleChange = (e) => {
        dispatch(updateCreateFormField({ name: e.target.name, value: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(applyLeaveRequest(createLeaveForm)).unwrap();
            setAlert({
                message: result?.message || "Leave request submitted successfully!",
                type: 'success'
            });
        } catch (err) {
            const errorMessage = typeof err === 'object' 
                ? (err.message || JSON.stringify(err)) 
                : err;
            setAlert({ message: errorMessage, type: 'error' });
        }
    };

    if (!createLeaveForm) return null;

    return (
        <MainLayout alert={alert} setAlert={setAlert}>
            <div className="apply-leave-container">
                <header className="page-header">
                    <h2>Request Leave</h2>
                    <p>Fill out the form below to submit a new leave application.</p>
                </header>

                <div className="form-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label><FileText size={16} /> Leave Type</label>
                            <select
                                name="leaveTypeId"
                                required
                                value={createLeaveForm.leaveTypeId}
                                onChange={handleChange}
                            >
                                <option value="">Select a leave type</option>
                                {leaveTypes && leaveTypes.map((leaveType) => (
                                    <option key={leaveType.id} value={leaveType.id}>
                                        {leaveType.name} ({leaveType.numberOfDays}days available)
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="date-row">
                            <div className="form-group">
                                <label><Calendar size={16} /> Start Date</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    required
                                    value={createLeaveForm.startDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label><Calendar size={16} /> End Date</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    required
                                    value={createLeaveForm.endDate}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label><FileText size={16} /> Comments (Optional)</label>
                            <textarea
                                name="requestedComments"
                                placeholder="Reason for leave..."
                                rows="4"
                                value={createLeaveForm.requestedComments}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-cancel" onClick={() => window.history.back()}>
                                <XCircle size={18} /> Cancel
                            </button>
                            <button type="submit" className="btn-submit" disabled={isLoading}>
                                <Send size={18} /> {isLoading ? 'Submitting...' : 'Submit Request'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
};

export default ApplyLeave;