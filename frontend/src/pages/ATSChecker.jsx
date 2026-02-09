import { useState, useContext, useEffect } from 'react';
import { ResumeContext } from '../context/ResumeContext';
import { getResumes } from '../services/resumeService';
import axios from 'axios';
import '../styles/ATSChecker.css';

const ATSChecker = () => {
    const { resumes, setResumes } = useContext(ResumeContext);
    const [selectedResumeId, setSelectedResumeId] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [resumesLoading, setResumesLoading] = useState(true);
    const [error, setError] = useState(null);

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
            setResumesLoading(false);
        }
    };

    const handleAnalyze = async () => {
        if (!selectedResumeId) {
            setError('Please select a resume to check');
            return;
        }

        const selectedResume = resumes.find(r => r._id === selectedResumeId);
        if (!selectedResume) {
            setError('Selected resume not found');
            return;
        }

        setLoading(true);
        setError(null);
        setAnalysis(null);

        try {
            // Retrieve token from localStorage
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.post('http://localhost:5000/api/ats/analyze', {
                resumeData: selectedResume,
                jobDescription: ''
            }, config);

            if (response.data.success) {
                setAnalysis(response.data.data);
            }
        } catch (err) {
            console.error('Analysis failed:', err);
            setError(err.response?.data?.message || 'Failed to analyze resume');
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return '#4caf50';
        if (score >= 60) return '#ff9800';
        return '#f44336';
    };

    return (
        <div className="ats-container">
            <h1 className="ats-title">ATS Resume Checker</h1>
            <p className="ats-subtitle">
                Select a resume to check its ATS compatibility score.
            </p>

            <div className="ats-content">
                <div className="ats-input-section">
                    <div className="resume-selection">
                        <label className="selection-label">Select Your Resume:</label>
                        {resumesLoading ? (
                            <p className="loading-text">Loading your resumes...</p>
                        ) : resumes.length === 0 ? (
                            <p className="no-resumes-text">
                                No resumes found. Please create a resume first.
                            </p>
                        ) : (
                            <select
                                className="ats-select"
                                value={selectedResumeId}
                                onChange={(e) => setSelectedResumeId(e.target.value)}
                            >
                                <option value="">-- Choose a resume --</option>
                                {resumes.map((resume) => (
                                    <option key={resume._id} value={resume._id}>
                                        {resume.title} ({resume.personalInfo?.fullName || 'Untitled'})
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    <button
                        className="ats-button"
                        onClick={handleAnalyze}
                        disabled={loading || !selectedResumeId || resumesLoading}
                    >
                        {loading ? 'Analyzing...' : 'Check ATS Score'}
                    </button>
                    {error && <div className="ats-error">{error}</div>}
                </div>

                {analysis && (
                    <div className="ats-results">
                        <div className="score-card">
                            <div
                                className="score-circle"
                                style={{ borderColor: getScoreColor(analysis.score) }}
                            >
                                <span className="score-value" style={{ color: getScoreColor(analysis.score) }}>
                                    {analysis.score}
                                </span>
                                <span className="score-label">Match</span>
                            </div>
                        </div>

                        <div className="analysis-grid">
                            <div className="analysis-card tips">
                                <h3>💡 Helpful Tips</h3>
                                <ul>
                                    {analysis.helpfulTips?.map((tip, index) => (
                                        <li key={index}>{tip}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="analysis-card missing">
                                <h3>❌ Missing Keywords</h3>
                                <div className="keyword-tags">
                                    {analysis.missingKeywords?.map((keyword, index) => (
                                        <span key={index} className="tag missing">{keyword}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="analysis-card issues">
                                <h3>⚠️ Formatting Issues</h3>
                                <ul>
                                    {analysis.formattingIssues?.map((issue, index) => (
                                        <li key={index}>{issue}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ATSChecker;
