
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import LoginPage from './interface/login/components/LoginPage'
import RegisterPage from './interface/register/components/RegisterPage'


function App() {

  return (
    <Router>
      <Routes>
        /* Redirect empty path to login */
        <Route path="/" element={<Navigate to="/login" />} />

        /* Define your pages */
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />

      </Routes>

    </Router>
  )
}

export default App
