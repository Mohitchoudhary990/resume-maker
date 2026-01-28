import React from 'react';
import '../../styles/ResumeTemplates.css';

const MinimalTemplate = ({ resume }) => {
    return (
        <div className="preview-inner template-minimal">
            <div className="preview-header-section">
                <div className="preview-name">{resume.personalInfo?.fullName}</div>
                <div className="preview-contact">
                    {resume.personalInfo?.email} • {resume.personalInfo?.phone} • {resume.personalInfo?.location}
                </div>
            </div>

            {resume.experience?.length > 0 && (
                <div className="preview-section">
                    <div className="preview-section-title">Work Experience</div>
                    {resume.experience.map((exp, index) => (
                        <div key={index} className="preview-item">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div className="preview-item-title">{exp.position}</div>
                                <div className="preview-item-date">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>
                            </div>
                            <div className="preview-item-subtitle">{exp.company}</div>
                            {exp.description && <div className="preview-item-description">{exp.description}</div>}
                        </div>
                    ))}
                </div>
            )}

            {resume.education?.length > 0 && (
                <div className="preview-section">
                    <div className="preview-section-title">Education</div>
                    {resume.education.map((edu, index) => (
                        <div key={index} className="preview-item">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div className="preview-item-title">{edu.degree}</div>
                                <div className="preview-item-date">{edu.startDate} – {edu.endDate}</div>
                            </div>
                            <div className="preview-item-subtitle">{edu.institution}</div>
                        </div>
                    ))}
                </div>
            )}

            {resume.skills && (
                <div className="preview-section">
                    <div className="preview-section-title">Skills</div>
                    <div className="preview-skills">
                        {[
                            ...(resume.skills.technical || []),
                            ...(resume.skills.tools || []),
                            ...(resume.skills.soft || [])
                        ].join(', ')}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MinimalTemplate;
