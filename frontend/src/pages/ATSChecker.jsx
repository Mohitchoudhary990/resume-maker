import { useState, useContext } from 'react';
import { ResumeContext } from '../context/ResumeContext';
import axios from 'axios';
import '../styles/ATSChecker.css';

const ATSChecker = () => {
    const { currentResume } = useContext(ResumeContext);
    const [jobDescription, setJobDescription] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAnalyze = async () => {
        if (!jobDescription.trim()) {
            setError('Please enter a job description');
            return;
        }

        if (!currentResume) {
            setError('Please load a resume first (go to Dashboard -> Edit Resume)');
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
                resumeData: currentResume,
                jobDescription
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
                Paste the job description below to check how well your resume matches.
            </p>

            <div className="ats-content">
                <div className="ats-input-section">
                    <textarea
                        className="ats-textarea"
                        placeholder="Paste Job Description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        rows={10}
                    />
                    <button
                        className="ats-button"
                        onClick={handleAnalyze}
                        disabled={loading}
                    >
                        {loading ? 'Analyzing...' : 'Check Score'}
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
