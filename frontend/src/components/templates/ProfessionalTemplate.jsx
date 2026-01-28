import React from 'react';
import '../../styles/ResumeTemplates.css';

const ProfessionalTemplate = ({ resume }) => {
    return (
        <div className="preview-inner template-professional">
            <div className="preview-header-section">
                <div className="preview-left">
                    <h1 className="preview-name">{resume.personalInfo?.fullName}</h1>
                    <div className="preview-title" style={{ color: '#bdc3c7', fontSize: '1.2rem' }}>{resume.personalInfo?.summary ? 'Professional' : ''}</div>
                </div>
                <div className="preview-right preview-contact" style={{ textAlign: 'right' }}>
                    <div>{resume.personalInfo?.email}</div>
                    <div>{resume.personalInfo?.phone}</div>
                    <div>{resume.personalInfo?.location}</div>
                    {resume.personalInfo?.linkedin && <div>{resume.personalInfo.linkedin}</div>}
                </div>
            </div>

            <div style={{ padding: '0 2rem' }}>
                {resume.personalInfo?.summary && (
                    <div className="preview-section">
                        <div className="preview-section-title">EXECUTIVE SUMMARY</div>
                        <div className="preview-summary">{resume.personalInfo.summary}</div>
                    </div>
                )}

                {resume.experience?.length > 0 && (
                    <div className="preview-section">
                        <div className="preview-section-title">PROFESSIONAL EXPERIENCE</div>
                        {resume.experience.map((exp, index) => (
                            <div key={index} className="preview-item">
                                <div className="preview-item-header">
                                    <div className="preview-item-title" style={{ fontSize: '1.1rem' }}>{exp.position}</div>
                                    <div className="preview-item-date">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</div>
                                </div>
                                <div className="preview-item-subtitle" style={{ fontWeight: 'bold', color: '#555' }}>{exp.company}, {exp.location}</div>
                                {exp.description && <div className="preview-item-description">{exp.description}</div>}
                            </div>
                        ))}
                    </div>
                )}

                {resume.education?.length > 0 && (
                    <div className="preview-section">
                        <div className="preview-section-title">EDUCATION</div>
                        {resume.education.map((edu, index) => (
                            <div key={index} className="preview-item">
                                <div className="preview-item-header">
                                    <div className="preview-item-title">{edu.institution}</div>
                                    <div className="preview-item-date">{edu.startDate} - {edu.endDate}</div>
                                </div>
                                <div className="preview-item-subtitle">{edu.degree} in {edu.field}</div>
                            </div>
                        ))}
                    </div>
                )}

                {resume.skills && (
                    <div className="preview-section">
                        <div className="preview-section-title">CORE COMPETENCIES</div>
                        <div className="preview-skills">
                            <ul style={{ columnCount: 2, paddingLeft: '20px' }}>
                                {[
                                    ...(resume.skills.technical || []),
                                    ...(resume.skills.tools || []),
                                    ...(resume.skills.soft || [])
                                ].map((skill, i) => (
                                    <li key={i}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfessionalTemplate;
