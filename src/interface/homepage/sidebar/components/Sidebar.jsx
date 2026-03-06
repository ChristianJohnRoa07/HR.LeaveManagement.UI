import { 
  LayoutDashboard, 
  CalendarPlus, 
  FileText, 
  Users, 
  Settings, 
  LogOut,
} from 'lucide-react';
import '../css/Sidebar.css';



const CustomSidebar = (props) => {

    const { handleLogout } = props;

 

    return (
        <nav className="sidebar">
            <div className="logo">HR-Ease</div>
            <ul className="nav-links">
                <li className="active"><LayoutDashboard size={20} /> Dashboard</li>
                <li><CalendarPlus size={20} /> Apply Leave</li>
                <li><FileText size={20} /> My History</li>
                <li><Users size={20} /> Team Status</li>
                <li><Settings size={20} /> Settings</li>
            </ul>
            <div className="logout-section">
                <button className="logout-btn" onClick={handleLogout}><LogOut size={18} /> Logout</button>
            </div>
        </nav>
    );
}

export default CustomSidebar;