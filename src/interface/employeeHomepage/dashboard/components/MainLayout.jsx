import React from 'react';
import CustomSidebar from '../../sidebar/components/Sidebar';
import { handleCookie } from '../../../../utils/hooks/handleCookie';
import { useRouteNavigation } from '../../../../utils/hooks/navigateRoute';
import { logout } from '../../../../services/authService';

import Alert from '../../../common/error/component/Alert';

const MainLayout = ({ children, alert, setAlert }) => {
    const { navigateToRoute } = useRouteNavigation();
    const { deleteCookie } = handleCookie();

    const handleLogout = async () => {
        const response = await logout();
        if (response.status) {
            deleteCookie();
            navigateToRoute("/login");
        } else {
            setAlert({ message: response.message, type: 'error'});
        }
    };

    return (
        <div className="dashboard-wrapper">
            <CustomSidebar handleLogout={handleLogout} />
            <main className="main-content">
                <Alert
                    message={alert.message}
                    type={alert.type}
                    onClose={() => setAlert({ ...alert, message: '' })}
                />
                {children}
            </main>
        </div>
    );
};

export default MainLayout;