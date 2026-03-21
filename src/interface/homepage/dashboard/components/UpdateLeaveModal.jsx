import React, { useState, useEffect } from 'react';
import { Calendar, FileText, Save, X } from 'lucide-react';
import Alert from '../../../common/error/component/Alert';

import { useDispatch, useSelector } from 'react-redux';
import { handleUpdateFormField, clearUpdateForm } from '../../../../features/leave/leaveSlice';
import '../css/UpdateLeaveModal.css';

const UpdateLeaveModal = ({ request, leaveTypes, isOpen, onClose, onUpdate, isLoading }) => {

    const { updateLeaveForm } = useSelector((state) => state.leave);

    const dispatch = useDispatch();

    const [alert, setAlert] = useState({ message: '', type: 'error' });

    useEffect(() => {

        if (isOpen && request) {
            
            const initialData = {
                id: request.id,
                leaveTypeId: request.leaveType.id,
                startDate: request.startDate?.split('T')[0] || '',
                endDate: request.endDate?.split('T')[0] || '',
                requestedComments: request.requestedComments || ''
            };

            // Loop through keys and initialize Redux state
            Object.entries(initialData).forEach(([name, value]) => {
                dispatch(handleUpdateFormField({ name, value }));
            });
            setAlert({ message: '', type: 'error' });
        } else if (!isOpen) {

            dispatch(clearUpdateForm());
        }
    }, [isOpen, request]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        dispatch(handleUpdateFormField({
            name: e.target.name,
            value: e.target.value
        }));
    };

    const isFormChanged = () => {
        if (!request) return false;

        return (
            updateLeaveForm.leaveTypeId !== (request.leaveType?.id || '') ||
            updateLeaveForm.startDate !== (request.startDate?.split('T')[0] || '') ||
            updateLeaveForm.endDate !== (request.endDate?.split('T')[0] || '') ||
            updateLeaveForm.requestedComments !== (request.requestedComments || '')
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await onUpdate(updateLeaveForm);
        } catch (error) {
            setAlert({ message: error, type: 'error' });
        }
    };

    const isSaveDisabled = isLoading || !isFormChanged();

    return (
        <div className="modal-overlay">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                <header className="modal-header">
                    <h3>Update Leave Request</h3>
                </header>

                <Alert
                    message={alert.message}
                    type={alert.type}
                    onClose={() => setAlert({ ...alert, message: '' })}
                />

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label><FileText size={16} /> Leave Type</label>
                        <select name="leaveTypeId" value={updateLeaveForm.leaveTypeId} onChange={handleChange} required>
                            {leaveTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="date-row">
                        <div className="form-group">
                            <label><Calendar size={16} /> Start Date</label>
                            <input type="date" name="startDate" value={updateLeaveForm.startDate} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label><Calendar size={16} /> End Date</label>
                            <input type="date" name="endDate" value={updateLeaveForm.endDate} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Comments</label>
                        <textarea name="requestedComments" value={updateLeaveForm.requestedComments} onChange={handleChange} rows="3" />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>Close</button>
                        <button type="submit" className="btn-submit" disabled={isSaveDisabled}>
                            <Save size={18} /> {isLoading ? 'Please wait...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateLeaveModal;