import { useState } from 'react';
import { optimizeATS, getAdvice } from '../services/aiService';

const AIAssistant = ({ resume, onClose }) => {
    const [activeTab, setActiveTab] = useState('tips');
    const [tips, setTips] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGetATSTips = async () => {
        setLoading(true);
        try {
            const response = await optimizeATS({ resumeData: resume });
            if (response.success) {
                setTips(response.data.tips);
            }
        } catch (err) {
            console.error('Failed to get ATS tips:', err);
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
