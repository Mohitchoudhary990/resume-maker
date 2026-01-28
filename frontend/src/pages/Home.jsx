import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Home.css';

const Home = () => {
    return (
        <div className="home-page">
            <div className="hero-section">
                <div className="container">
                    <div className="hero-content fade-in">
                        <h1 className="hero-title">
                            Build Your Perfect Resume with <span className="gradient-text">AI</span>
                        </h1>
                        <p className="hero-subtitle">
                            Create professional, ATS-friendly resumes in minutes with the power of artificial intelligence
                        </p>
                        <div className="hero-actions">
                            <Link to="/register" className="btn btn-primary btn-lg">
                                Get Started Free
                            </Link>
                            <Link to="/login" className="btn btn-secondary btn-lg">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="features-section section">
                <div className="container">
                    <h2 className="text-center mb-4">Powerful Features</h2>
                    <div className="grid grid-3">
                        <div className="feature-card card">
                            <div className="feature-icon">✨</div>
                            <h3>AI-Powered Content</h3>
                            <p>Generate professional summaries, improve descriptions, and get smart suggestions</p>
                        </div>
                        <div className="feature-card card">
                            <div className="feature-icon">📄</div>
                            <h3>Multiple Templates</h3>
                            <p>Choose from modern, classic, creative, and minimal resume designs</p>
                        </div>
                        <div className="feature-card card">
                            <div className="feature-icon">👁️</div>
                            <h3>Live Preview</h3>
                            <p>See your resume update in real-time as you make changes</p>
                        </div>
                        <div className="feature-card card">
                            <div className="feature-icon">📥</div>
                            <h3>PDF Export</h3>
                            <p>Download your resume as a professional PDF with one click</p>
                        </div>
                        <div className="feature-card card">
                            <div className="feature-icon">🎯</div>
                            <h3>ATS Optimized</h3>
                            <p>Get tips to make your resume pass Applicant Tracking Systems</p>
                        </div>
                        <div className="feature-card card">
                            <div className="feature-icon">💾</div>
                            <h3>Save & Manage</h3>
                            <p>Create multiple resumes and manage them all in one place</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
