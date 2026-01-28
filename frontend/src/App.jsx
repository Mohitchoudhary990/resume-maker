import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import ATSChecker from './pages/ATSChecker';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import './styles/index.css';

function App() {
    return (
        <AuthProvider>
            <ResumeProvider>
                <Router>
                    <div className="app">
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <PrivateRoute>
                                        <Dashboard />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/builder/:id"
                                element={
                                    <PrivateRoute>
                                        <ResumeBuilder />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/ats-checker"
                                element={
                                    <PrivateRoute>
                                        <ATSChecker />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/admin"
                                element={
                                    <AdminRoute>
                                        <AdminDashboard />
                                    </AdminRoute>
                                }
                            />
                        </Routes>
                    </div>
                </Router>
            </ResumeProvider>
        </AuthProvider>
    );
}

export default App;
