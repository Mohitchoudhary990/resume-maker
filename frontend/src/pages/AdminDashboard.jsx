import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

import '../styles/Dashboard.css';
import '../styles/AdminDashboard.css';

import TemplateManager from '../components/admin/TemplateManager';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false); // Changed to false initially
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    // Fetch users only when activeTab is 'users' and we haven't fetched them yet (or force refresh)
    // For simplicity, just fetch when tab is 'users'
    useEffect(() => {
        if (activeTab === 'users') {
            fetchUsers();
        }
    }, [activeTab]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const config = {
                withCredentials: true
            };

            const response = await axios.get('http://localhost:5000/api/users', config);
            setUsers(response.data.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch users');
            setLoading(false);
            console.error(err);
        }
    };

    const deleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const config = {
                    withCredentials: true
                };
                await axios.delete(`http://localhost:5000/api/users/${id}`, config);
                setUsers(users.filter((user) => user._id !== id));
            } catch (err) {
                alert('Failed to delete user');
                console.error(err);
            }
        }
    };

    // Removed global loading check to allow UI to render headers
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="container dashboard-container">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <p>Manage users and system settings</p>
            </div>

            <div className="dashboard-tabs" style={{ marginBottom: '2rem', borderBottom: '1px solid #ddd', display: 'flex' }}>
                <button
                    onClick={() => setActiveTab('users')}
                    style={{
                        padding: '1rem',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'users' ? '2px solid #2563eb' : 'none',
                        color: activeTab === 'users' ? '#2563eb' : '#666',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    Users
                </button>
                <button
                    onClick={() => setActiveTab('templates')}
                    style={{
                        padding: '1rem',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'templates' ? '2px solid #2563eb' : 'none',
                        color: activeTab === 'templates' ? '#2563eb' : '#666',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    Templates
                </button>
            </div>

            {activeTab === 'users' && (
                <div className="users-list-section">
                    <h2>Users ({users.length})</h2>
                    {loading ? (
                        <div className="loading">Loading users...</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="users-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Joined</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((u) => (
                                        <tr key={u._id}>
                                            <td>{u.name}</td>
                                            <td>{u.email}</td>
                                            <td>
                                                <span className={`role-badge ${u.role}`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                {u._id !== user._id && (
                                                    <button
                                                        onClick={() => deleteUser(u._id)}
                                                        className="btn-delete"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'templates' && <TemplateManager />}

        </div>
    );
};

export default AdminDashboard;
