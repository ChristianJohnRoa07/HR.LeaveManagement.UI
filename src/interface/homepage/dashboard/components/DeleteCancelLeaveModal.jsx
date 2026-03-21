import React from 'react';
import { AlertTriangle } from 'lucide-react';
import '../css/DeleteCancelLeaveModal.css';

const DeleteCancelLeaveModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    isLoading,
    title = "Confirm Action",
    message = "Are you sure you want to proceed?",
    confirmText = "Confirm",
    closeText = "Close",
    confirmButtonClass = "btn-delete-confirm", // Control styling via class
    icon: Icon, // Allow passing a custom Lucide icon
    iconColor = "#dc2626"
}) => {
    if (!isOpen) return null;

    const DisplayIcon = Icon || AlertTriangle;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>

                <div className="delete-warning-icon">
                    <DisplayIcon size={48} color={iconColor} />
                </div>

                <header className="modal-header-delete">
                    <h3>{title}</h3>
                    <div className="modal-message">
                        {typeof message === 'string' ? <p>{message}</p> : message}
                    </div>
                </header>

                <div className="modal-actions delete-actions">
                    <button 
                        type="button" 
                        className="btn-cancel" 
                        onClick={onClose} 
                        disabled={isLoading}
                    >
                        {closeText}
                    </button>
                    <button 
                        type="button" 
                        className={`btn-confirm-action ${confirmButtonClass}`} 
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteCancelLeaveModal;