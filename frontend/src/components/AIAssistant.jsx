import React, { useState } from 'react';
import { optimizeATS, optimizeATSFile, getAdvice } from '../services/aiService';

const AIAssistant = ({ resume, onClose }) => {
    const [activeTab, setActiveTab] = useState('tips');
    const [tips, setTips] = useState('');
    const [loading, setLoading] = useState(false);
    const [jobDescription, setJobDescription] = useState('');
    const [resumeFile, setResumeFile] = useState(null);
    const [useUploadedFile, setUseUploadedFile] = useState(false);

    const handleGetATSTips = async () => {
        if (!jobDescription.trim()) {
            alert('Please enter a Job Description');
            return;
        }

        if (useUploadedFile && !resumeFile) {
            alert('Please upload a resume file (PDF)');
            return;
        }

        setLoading(true);
        try {
            let response;
            if (useUploadedFile) {
                const formData = new FormData();
                formData.append('targetJobDescription', jobDescription);
                formData.append('resume', resumeFile);
                response = await optimizeATSFile(formData);
            } else {
                response = await optimizeATS({
                    resumeData: resume,
                    targetJobDescription: jobDescription
                });
            }

            if (response.success) {
                setTips(response.data.tips);
            }
        } catch (err) {
            console.error('Failed to get ATS tips:', err);
            alert('Failed to analyze resume. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ai-assistant-overlay">
            <div className="ai-assistant-panel slide-in">
                <div className="ai-assistant-header">
                    <h2>✨ AI Assistant</h2>
                    <button onClick={onClose} className="close-btn">×</button>
                </div>

                <div className="ai-assistant-tabs">
                    <button
                        className={`tab ${activeTab === 'tips' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tips')}
                    >
                        ATS Tips
                    </button>
                    <button
                        className={`tab ${activeTab === 'advice' ? 'active' : ''}`}
                        onClick={() => setActiveTab('advice')}
                    >
                        General Advice
                    </button>
                </div>

                <div className="ai-assistant-content">
                    {activeTab === 'tips' && (
                        <div className="ai-section">
                            <h3>ATS Optimization</h3>
                            <p>Get tips to make your resume more ATS-friendly</p>

                            <div className="form-group">
                                <label className="form-label">Resume Source</label>
                                <div className="radio-group" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            checked={!useUploadedFile}
                                            onChange={() => setUseUploadedFile(false)}
                                        />
                                        Use Current Resume
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            checked={useUploadedFile}
                                            onChange={() => setUseUploadedFile(true)}
                                        />
                                        Upload PDF Resume
                                    </label>
                                </div>
                            </div>

                            {useUploadedFile && (
                                <div className="form-group slide-down">
                                    <label className="form-label">Upload Resume (PDF)</label>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        className="form-input"
                                        onChange={(e) => setResumeFile(e.target.files[0])}
                                    />
                                </div>
                            )}

                            <div className="form-group">
                                <label className="form-label">Job Description</label>
                                <textarea
                                    className="form-textarea"
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    placeholder="Paste the job description here..."
                                    rows="10"
                                />
                            </div>

                            <button
                                onClick={handleGetATSTips}
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Analyzing...' : 'Get ATS Tips'}
                            </button>
                            {tips && (
                                <div className="ai-result">
                                    <pre>{tips}</pre>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'advice' && (
                        <div className="ai-section">
                            <h3>Resume Advice</h3>
                            <p>AI-powered suggestions are available in each section:</p>
                            <ul className="advice-list">
                                <li>✨ Generate professional summary</li>
                                <li>✨ Improve job descriptions</li>
                                <li>✨ Suggest relevant skills</li>
                                <li>✨ Generate project descriptions</li>
                            </ul>
                            <p className="mt-3">Look for the AI buttons in each section to use these features!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;
