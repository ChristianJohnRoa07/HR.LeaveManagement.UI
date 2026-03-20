import React from 'react';
import CustomSidebar from '../../sidebar/components/Sidebar';
import { handleCookie } from '../../../../utils/hooks/handleCookie';
import { useRouteNavigation } from '../../../../utils/hooks/navigateRoute';
import { logout } from '../../../../services/authService';

const MainLayout = ({ children, errorMessage, setErrorMessage }) => {
    const { navigateToRoute } = useRouteNavigation();
    const { deleteCookie } = handleCookie();

    const handleLogout = async () => {
        const response = await logout();
        if (response.status) {
            deleteCookie();
            navigateToRoute("/login");
        } else {
            setErrorMessage(response.message);
        }
    };

    return (
        <div className="dashboard-wrapper">
            <CustomSidebar handleLogout={handleLogout} />
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
                {children}
            </main>
        </div>
    );
};

export default MainLayout;