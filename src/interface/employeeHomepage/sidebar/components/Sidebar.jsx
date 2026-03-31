import {
    LayoutDashboard,
    CalendarPlus,
    FileText,
    Users,
    Settings,
    LogOut,
} from 'lucide-react';
import '../css/Sidebar.css';
import { NavLink } from 'react-router-dom';

const CustomSidebar = (props) => {

    const { handleLogout } = props;
    return (
        <nav className="sidebar">
            <div className="logo">HR-Ease</div>
            <ul className="nav-links">
                <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <LayoutDashboard size={20} /> Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/apply-leave"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <CalendarPlus size={20} /> Apply Leave
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/history"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <FileText size={20} /> My History
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/team"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <Users size={20} /> Team Status
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/settings"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <Settings size={20} /> Settings
                    </NavLink>
                </li>
            </ul>
            <div className="logout-section">
                <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={18} /> Logout
                </button>
            </div>
        </nav>
    );
}

export default CustomSidebar;