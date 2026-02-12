import React, { useState, useContext, useEffect } from 'react';
import { ResumeContext } from '../context/ResumeContext';
import { getResumes } from '../services/resumeService';
import axios from 'axios';
import '../styles/ATSChecker.css';

const ATSChecker = () => {
    const { resumes, setResumes } = useContext(ResumeContext);
    const [uploadMode, setUploadMode] = useState('saved'); // 'saved' or 'upload'
    const [selectedResumeId, setSelectedResumeId] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!validTypes.includes(file.type)) {
                setError('Please upload a PDF or DOCX file');
                setSelectedFile(null);
                return;
            }
            // Validate file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('File size must be less than 5MB');
                setSelectedFile(null);
                return;
            }
            setSelectedFile(file);
            setError(null);
        }
    };

    const handleAnalyze = async () => {
        if (!jobDescription.trim()) {
            setError('Please provide a job description for accurate ATS scoring');
            return;
        }

        setLoading(true);
        setError(null);
        setAnalysis(null);

        try {
            const token = localStorage.getItem('token');

            if (uploadMode === 'upload') {
                // File upload mode
                if (!selectedFile) {
                    setError('Please select a file to upload');
                    setLoading(false);
                    return;
                }

                const formData = new FormData();
                formData.append('resume', selectedFile);
                formData.append('jobDescription', jobDescription);

                const response = await axios.post('http://localhost:5000/api/ats/analyze-upload', formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.data.success) {
                    setAnalysis(response.data.data);
                }
            } else {
                // Saved resume mode
                if (!selectedResumeId) {
                    setError('Please select a resume to check');
                    setLoading(false);
                    return;
                }

                const selectedResume = resumes.find(r => r._id === selectedResumeId);
                if (!selectedResume) {
                    setError('Selected resume not found');
                    setLoading(false);
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const response = await axios.post('http://localhost:5000/api/ats/analyze', {
                    resumeData: selectedResume,
                    jobDescription: jobDescription
                }, config);

                if (response.data.success) {
                    setAnalysis(response.data.data);
                }
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
                Check your resume's ATS compatibility score against a job description.
            </p>

            <div className="ats-content">
                <div className="ats-input-section">
                    {/* Mode Toggle */}
                    <div className="mode-toggle">
                        <button
                            className={`mode-btn ${uploadMode === 'saved' ? 'active' : ''}`}
                            onClick={() => {
                                setUploadMode('saved');
                                setSelectedFile(null);
                                setError(null);
                            }}
                        >
                            📋 Saved Resumes
                        </button>
                        <button
                            className={`mode-btn ${uploadMode === 'upload' ? 'active' : ''}`}
                            onClick={() => {
                                setUploadMode('upload');
                                setSelectedResumeId('');
                                setError(null);
                            }}
                        >
                            📤 Upload File
                        </button>
                    </div>

                    {/* Resume Selection or File Upload */}
                    {uploadMode === 'saved' ? (
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
                    ) : (
                        <div className="file-upload-section">
                            <label className="selection-label">Upload Resume (PDF or DOCX):</label>
                            <div className="file-input-wrapper">
                                <input
                                    type="file"
                                    id="resume-file"
                                    className="file-input"
                                    accept=".pdf,.docx"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="resume-file" className="file-input-label">
                                    {selectedFile ? `📄 ${selectedFile.name}` : '📁 Choose File'}
                                </label>
                            </div>
                            {selectedFile && (
                                <p className="file-info">
                                    Size: {(selectedFile.size / 1024).toFixed(2)} KB
                                </p>
                            )}
                        </div>
                    )}

                    <div className="job-description-section">
                        <label className="selection-label">Job Description:</label>
                        <textarea
                            className="ats-textarea"
                            placeholder="Paste the job description here for accurate ATS matching..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            rows={8}
                        />
                    </div>

                    <button
                        className="ats-button"
                        onClick={handleAnalyze}
                        disabled={loading || !jobDescription.trim() || (uploadMode === 'saved' ? !selectedResumeId : !selectedFile)}
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
