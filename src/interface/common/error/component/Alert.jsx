import React from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';
import '../css/Alert.css';

const Alert = ({ message, type = 'error', onClose }) => {
    if (!message) return null;

    const config = {
        error: { icon: <AlertCircle size={20} />, class: 'alert-error' },
        success: { icon: <CheckCircle size={20} />, class: 'alert-success' }
    };

    const { icon, class: typeClass } = config[type] || config.error;

    return (
        <div className={`alert-container ${typeClass}`}>
            <div className="alert-content">
                <span className="alert-icon-wrapper">{icon}</span>
                <span>{message}</span>
            </div>
            {onClose && (
                <button 
                    type="button" 
                    className="close-btn" 
                    onClick={onClose}
                    title="Close"
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );
};

export default Alert;