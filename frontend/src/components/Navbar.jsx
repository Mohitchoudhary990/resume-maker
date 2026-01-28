import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    AI Resume Maker
                </Link>

                <ul className="navbar-nav">
                    {isAuthenticated ? (
                        <>
                            {user?.role !== 'admin' && (
                                <>
                                    <li>
                                        <Link to="/dashboard" className="navbar-link">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/ats-checker" className="navbar-link">
                                            ATS Score
                                        </Link>
                                    </li>
                                </>
                            )}
                            {user?.role === 'admin' && (
                                <li>
                                    <Link to="/admin" className="navbar-link">
                                        Admin
                                    </Link>
                                </li>
                            )}
                            <li>
                                <span className="navbar-user">👤 {user?.name}</span>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login" className="navbar-link">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="btn btn-primary btn-sm">
                                    Get Started
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
