import React from 'react';
import '../../styles/ResumeTemplates.css';

const ElegantTemplate = ({ resume }) => {
    return (
        <div className="preview-inner template-elegant">
            <div className="preview-header-section" style={{ marginBottom: '2rem' }}>
                <div className="preview-name">{resume.personalInfo?.fullName}</div>
                <div className="preview-contact">
                    {resume.personalInfo?.email} &nbsp;•&nbsp; {resume.personalInfo?.phone} &nbsp;•&nbsp; {resume.personalInfo?.location}
                </div>
            </div>

            {resume.personalInfo?.summary && (
                <div className="preview-section">
                    <div className="preview-section-title">Profile</div>
                    <div className="preview-summary" style={{ textAlign: 'center' }}>{resume.personalInfo.summary}</div>
                </div>
            )}

            {resume.experience?.length > 0 && (
                <div className="preview-section">
                    <div className="preview-section-title">Experience</div>
                    {resume.experience.map((exp, index) => (
                        <div key={index} className="preview-item" style={{ textAlign: 'center' }}>
                            <div className="preview-item-title" style={{ fontSize: '1.2rem' }}>{exp.position}</div>
                            <div className="preview-item-subtitle" style={{ fontStyle: 'italic' }}>{exp.company}</div>
                            <div className="preview-item-date" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</div>
                            {exp.description && <div className="preview-item-description" style={{ textAlign: 'left' }}>{exp.description}</div>}
                        </div>
                    ))}
                </div>
            )}

            {resume.education?.length > 0 && (
                <div className="preview-section">
                    <div className="preview-section-title">Education</div>
                    {resume.education.map((edu, index) => (
                        <div key={index} className="preview-item" style={{ textAlign: 'center' }}>
                            <div className="preview-item-title">{edu.degree}</div>
                            <div className="preview-item-subtitle">{edu.institution}</div>
                            <div className="preview-item-date">{edu.startDate} - {edu.endDate}</div>
                        </div>
                    ))}
                </div>
            )}

            {resume.skills && (
                <div className="preview-section">
                    <div className="preview-section-title">Skills</div>
                    <div className="preview-skills" style={{ textAlign: 'center' }}>
                        {[
                            ...(resume.skills.technical || []),
                            ...(resume.skills.tools || []),
                            ...(resume.skills.languages || [])
                        ].join('  ◇  ')}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ElegantTemplate;
