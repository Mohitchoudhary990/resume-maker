import React from 'react';
import '../../styles/ResumeTemplates.css';

const ClassicTemplate = ({ resume }) => {
    return (
        <div className="preview-inner template-classic">
            <div className="preview-header-section">
                <div className="preview-name">{resume.personalInfo?.fullName}</div>
                <div className="preview-contact">
                    {resume.personalInfo?.email && <span>{resume.personalInfo.email}</span>}
                    {resume.personalInfo?.phone && <span> | {resume.personalInfo.phone}</span>}
                    {resume.personalInfo?.location && <span> | {resume.personalInfo.location}</span>}
                    {resume.personalInfo?.linkedin && <span> | {resume.personalInfo.linkedin}</span>}
                    {resume.personalInfo?.website && <span> | {resume.personalInfo.website}</span>}
                </div>
            </div>

            {resume.personalInfo?.summary && (
                <div className="preview-section">
                    <div className="preview-section-title">Professional Summary</div>
                    <div className="preview-summary">{resume.personalInfo.summary}</div>
                </div>
            )}

            {resume.experience?.length > 0 && (
                <div className="preview-section">
                    <div className="preview-section-title">Experience</div>
                    {resume.experience.map((exp, index) => (
                        <div key={index} className="preview-item">
                            <div className="preview-item-header">
                                <div className="preview-item-title">{exp.position}</div>
                                <div className="preview-item-date">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</div>
                            </div>
                            <div className="preview-item-subtitle">{exp.company}, {exp.location}</div>
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
                            <div className="preview-item-header">
                                <div className="preview-item-title">{edu.degree} in {edu.field}</div>
                                <div className="preview-item-date">{edu.startDate} - {edu.endDate}</div>
                            </div>
                            <div className="preview-item-subtitle">{edu.institution}, {edu.location}</div>
                            {edu.gpa && <div className="preview-item-description">GPA: {edu.gpa}</div>}
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
                            ...(resume.skills.soft || []),
                            ...(resume.skills.languages || [])
                        ].join(' • ')}
                    </div>
                </div>
            )}

            {resume.projects?.length > 0 && (
                <div className="preview-section">
                    <div className="preview-section-title">Projects</div>
                    {resume.projects.map((project, index) => (
                        <div key={index} className="preview-item">
                            <div className="preview-item-title">{project.name}</div>
                            {project.description && <div className="preview-item-description">{project.description}</div>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ClassicTemplate;
