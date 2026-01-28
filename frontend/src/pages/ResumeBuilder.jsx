import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ResumeContext } from '../context/ResumeContext';
import { getResume, updateResume } from '../services/resumeService';
import '../styles/ResumeBuilder.css';
import PersonalInfo from '../components/PersonalInfo';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import ResumePreview from '../components/ResumePreview';
import AIAssistant from '../components/AIAssistant';
import TemplateSelection from '../components/TemplateSelection';

const ResumeBuilder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentResume, setCurrentResume } = useContext(ResumeContext);

    const [activeSection, setActiveSection] = useState('templates');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showAI, setShowAI] = useState(false);

    useEffect(() => {
        if (id) {
            loadResume();
        }
    }, [id]);

    const loadResume = async () => {
        try {
            const response = await getResume(id);
            if (response.success) {
                setCurrentResume(response.data);
            }
        } catch (err) {
            console.error('Failed to load resume:', err);
            navigate('/dashboard');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!currentResume) return;

        setSaving(true);
        try {
            const response = await updateResume(id, currentResume);
            if (response.success) {
                setCurrentResume(response.data);
            }
        } catch (err) {
            console.error('Failed to save resume:', err);
        } finally {
            setSaving(false);
        }
    };

    const updateResumeData = (section, data) => {
        setCurrentResume({
            ...currentResume,
            [section]: data
        });
    };

    if (loading) {
        return (
            <div className="builder-loading">
                <div className="loading-spinner"></div>
                <p>Loading resume...</p>
            </div>
        );
    }

    const sections = [
        { id: 'templates', label: 'Design', icon: '🎨' },
        { id: 'personal', label: 'Personal Info', icon: '👤' },
        { id: 'experience', label: 'Experience', icon: '💼' },
        { id: 'education', label: 'Education', icon: '🎓' },
        { id: 'skills', label: 'Skills', icon: '⚡' },
        { id: 'projects', label: 'Projects', icon: '🚀' }
    ];

    return (
        <div className="resume-builder">
            <div className="builder-header">
                <div className="container-fluid">
                    <div className="builder-header-content">
                        <div>
                            <h2>{currentResume?.title || 'Resume Builder'}</h2>
                            <p>Build your professional resume with AI assistance</p>
                        </div>
                        <div className="builder-actions">
                            <button
                                onClick={() => setShowAI(!showAI)}
                                className="btn btn-accent btn-sm"
                            >
                                {showAI ? '✕ Close AI' : '✨ AI Assistant'}
                            </button>
                            <button
                                onClick={handleSave}
                                className="btn btn-primary"
                                disabled={saving}
                            >
                                {saving ? 'Saving...' : '💾 Save'}
                            </button>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="btn btn-secondary"
                            >
                                ← Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="builder-container">
                <div className="builder-sidebar">
                    <nav className="builder-nav">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`builder-nav-item ${activeSection === section.id ? 'active' : ''}`}
                            >
                                <span className="nav-icon">{section.icon}</span>
                                <span>{section.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="builder-content">
                    <div className="builder-editor">
                        {activeSection === 'templates' && (
                            <TemplateSelection
                                currentTemplate={currentResume?.template || 'modern'}
                                onChange={(templateId) => updateResumeData('template', templateId)}
                            />
                        )}
                        {activeSection === 'personal' && (
                            <PersonalInfo
                                data={currentResume?.personalInfo}
                                onChange={(data) => updateResumeData('personalInfo', data)}
                            />
                        )}
                        {activeSection === 'experience' && (
                            <Experience
                                data={currentResume?.experience}
                                onChange={(data) => updateResumeData('experience', data)}
                            />
                        )}
                        {activeSection === 'education' && (
                            <Education
                                data={currentResume?.education}
                                onChange={(data) => updateResumeData('education', data)}
                            />
                        )}
                        {activeSection === 'skills' && (
                            <Skills
                                data={currentResume?.skills}
                                onChange={(data) => updateResumeData('skills', data)}
                            />
                        )}
                        {activeSection === 'projects' && (
                            <Projects
                                data={currentResume?.projects}
                                onChange={(data) => updateResumeData('projects', data)}
                            />
                        )}
                    </div>

                    <div className="builder-preview">
                        <ResumePreview resume={currentResume} />
                    </div>
                </div>
            </div>

            {showAI && (
                <AIAssistant
                    resume={currentResume}
                    onClose={() => setShowAI(false)}
                />
            )}
        </div>
    );
};

export default ResumeBuilder;
