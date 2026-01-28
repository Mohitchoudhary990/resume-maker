import React from 'react';
import '../../styles/ResumeTemplates.css';

const CreativeTemplate = ({ resume }) => {
    return (
        <div className="preview-inner template-creative">
            <div className="creative-header">
                <div className="preview-name">{resume.personalInfo?.fullName}</div>
                <div className="preview-contact">
                    {resume.personalInfo?.email && <div>✉ {resume.personalInfo.email}</div>}
                    {resume.personalInfo?.phone && <div>📞 {resume.personalInfo.phone}</div>}
                    {resume.personalInfo?.location && <div>📍 {resume.personalInfo.location}</div>}
                </div>
            </div>

            <div className="creative-body">
                {resume.personalInfo?.summary && (
                    <div className="preview-section">
                        <div className="preview-section-title">ABOUT ME</div>
                        <div className="preview-summary">{resume.personalInfo.summary}</div>
                    </div>
                )}

                {resume.experience?.length > 0 && (
                    <div className="preview-section">
                        <div className="preview-section-title">EXPERIENCE</div>
                        {resume.experience.map((exp, index) => (
                            <div key={index} className="preview-item">
                                <div className="preview-item-title" style={{ color: '#FF6B6B' }}>{exp.position}</div>
                                <div className="preview-item-subtitle">{exp.company} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}</div>
                                {exp.description && <div className="preview-item-description">{exp.description}</div>}
                            </div>
                        ))}
                    </div>
                )}

                {resume.skills && (
                    <div className="preview-section">
                        <div className="preview-section-title">EXPERTISE</div>
                        <div className="preview-skills">
                            {[
                                ...(resume.skills.technical || []),
                                ...(resume.skills.tools || [])
                            ].map((skill, i) => (
                                <span key={i} style={{
                                    background: '#FF6B6B',
                                    color: 'white',
                                    padding: '2px 8px',
                                    borderRadius: '12px',
                                    margin: '0 5px 5px 0',
                                    display: 'inline-block',
                                    fontSize: '0.9rem'
                                }}>{skill}</span>
                            ))}
                        </div>
                    </div>
                )}

                {resume.education?.length > 0 && (
                    <div className="preview-section">
                        <div className="preview-section-title">EDUCATION</div>
                        {resume.education.map((edu, index) => (
                            <div key={index} className="preview-item">
                                <div className="preview-item-title">{edu.degree}</div>
                                <div className="preview-item-subtitle">{edu.institution}</div>
                                <div className="preview-item-date">{edu.startDate} - {edu.endDate}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreativeTemplate;
