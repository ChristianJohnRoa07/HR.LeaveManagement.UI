import React, { useState, useEffect } from 'react';
import { Calendar, FileText, Send, XCircle } from 'lucide-react';
import MainLayout from './MainLayout';
import '../css/ApplyLeave.css';

import { useDispatch, useSelector } from 'react-redux';
import { getLeaveTypes } from '../../../../services/leaveTypeService';
import { applyLeaveRequest } from '../../../../services/leaveRequestService';

import Alert from '../../../common/error/component/Alert';

const ApplyLeave = () => {
    const dispatch = useDispatch();

    const { leaveTypes, isLoading } = useSelector((state) => state.leave);

    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        leaveTypeId: '',
        startDate: '',
        endDate: '',
        requestedComments: ''
    });

    const [alert, setAlert] = useState({ message: '', type: 'error' });

    useEffect(() => {
        if (leaveTypes.length === 0) {
            Promise.all([
                dispatch(getLeaveTypes()).unwrap(),
            ]).catch(err => setErrorMessage("Failed to load dashboard data."));
        }
    }, [leaveTypes.length, dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(applyLeaveRequest(formData)).unwrap();
            setAlert({
                message: result.message || "Leave request submitted successfully!",
                type: 'success'
            });
        } catch (err) {
            setAlert({ message: err, type: 'error' });
        }
    };

    return (
        <MainLayout>
            <div className="apply-leave-container">
                <header className="page-header">
                    <h2>Request Leave</h2>
                    <p>Fill out the form below to submit a new leave application.</p>
                </header>

                <div className="form-card">
                    <Alert
                        message={alert.message}
                        type={alert.type}
                        onClose={() => setAlert({ ...alert, message: '' })}
                    />
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label><FileText size={16} /> Leave Type</label>
                            <select
                                name="leaveTypeId"
                                required
                                value={formData.leaveTypeId}
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
                                    value={formData.startDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label><Calendar size={16} /> End Date</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    required
                                    value={formData.endDate}
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
                                value={formData.requestedComments}
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