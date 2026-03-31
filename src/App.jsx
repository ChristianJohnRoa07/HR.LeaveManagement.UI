
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Components
import LoginPage from './interface/login/components/LoginPage'
import RegisterPage from './interface/register/components/RegisterPage'
import Dashboard from './interface/employeeHomepage/dashboard/components/Dashboard';
import ApplyLeave from './interface/employeeHomepage/dashboard/components/ApplyLeave';


const DashboardGate = ({ user }) => {
  if (!user) return <Navigate to="/login" />;

  // Logic: Redirect based on role
  return user.role === 'Administrator' ? <h1>ADMIN</h1> : <Dashboard />;
};

const ProtectedRoute = ({ user, children }) => {
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {

  const user = useSelector((state) => state.auth.user);

  return (
    <Router>
      <Routes>
        /* Redirect empty path to login */
        <Route path="/" element={<Navigate to="/login" />} />

        /* Public routes */
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />


        <Route path="/dashboard" element={<DashboardGate user={user} />} />

        <Route
          path='/apply-leave'
          element={
            <ProtectedRoute user={user}>
              <ApplyLeave />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />

      </Routes>

    </Router>
  )
}

export default App
