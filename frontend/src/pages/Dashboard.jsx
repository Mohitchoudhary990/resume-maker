import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Dashboard.css';
import { ResumeContext } from '../context/ResumeContext';
import { getResumes, createResume, deleteResume } from '../services/resumeService';

const Dashboard = () => {
    const navigate = useNavigate();
    const { setCurrentResume, resumes, setResumes } = useContext(ResumeContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const response = await getResumes();
            if (response.success) {
                setResumes(response.data);
            }
        } catch (err) {
            setError('Failed to load resumes');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateResume = async () => {
        try {
            const response = await createResume({
                title: 'New Resume',
                template: 'modern'
            });

            if (response.success) {
                setCurrentResume(response.data);
                navigate(`/builder/${response.data._id}`);
            }
        } catch (err) {
            setError('Failed to create resume');
        }
    };

    const handleEditResume = (resume) => {
        setCurrentResume(resume);
        navigate(`/builder/${resume._id}`);
    };

    const handleDeleteResume = async (id) => {
        if (!window.confirm('Are you sure you want to delete this resume?')) {
            return;
        }

        try {
            await deleteResume(id);
            setResumes(resumes.filter(r => r._id !== id));
        } catch (err) {
            setError('Failed to delete resume');
        }
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
                <p>Loading your resumes...</p>
            </div>
        );
    }

    return (
        <div className="dashboard fade-in">
            <div className="container">
                <div className="dashboard-header">
                    <div>
                        <h1>My Resumes</h1>
                        <p>Create and manage your professional resumes</p>
                    </div>
                    <button onClick={handleCreateResume} className="btn btn-primary">
                        <span>✨</span> Create New Resume
                    </button>
                </div>

                {error && (
                    <div className="alert alert-error">
                        {error}
                    </div>
                )}

                {resumes.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">📄</div>
                        <h2>No resumes yet</h2>
                        <p>Create your first AI-powered resume to get started</p>
                        <button onClick={handleCreateResume} className="btn btn-primary btn-lg">
                            Create Your First Resume
                        </button>
                    </div>
                ) : (
                    <div className="resume-grid">
                        {resumes.map((resume) => (
                            <div key={resume._id} className="resume-card card">
                                <div className="resume-card-header">
                                    <h3>{resume.title}</h3>
                                    <span className="resume-template-badge">{resume.template}</span>
                                </div>

                                <div className="resume-card-body">
                                    <p className="resume-info">
                                        <strong>Name:</strong> {resume.personalInfo?.fullName || 'Not set'}
                                    </p>
                                    <p className="resume-info">
                                        <strong>Email:</strong> {resume.personalInfo?.email || 'Not set'}
                                    </p>
                                    <p className="resume-meta">
                                        Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="resume-card-actions">
                                    <button
                                        onClick={() => handleEditResume(resume)}
                                        className="btn btn-primary btn-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteResume(resume._id)}
                                        className="btn btn-secondary btn-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
