import React from 'react';
import '../../styles/ResumeTemplates.css';

const ModernTemplate = ({ resume }) => {
    return (
        <div className="preview-inner template-modern">
            <div className="preview-header-section">
                <div className="preview-name">{resume.personalInfo?.fullName}</div>
                <div className="preview-contact">
                    {resume.personalInfo?.email && <span>{resume.personalInfo.email}</span>}
                    {resume.personalInfo?.phone && <span> • {resume.personalInfo.phone}</span>}
                    {resume.personalInfo?.location && <span> • {resume.personalInfo.location}</span>}
                </div>
                {(resume.personalInfo?.linkedin || resume.personalInfo?.website) && (
                    <div className="preview-links">
                        {resume.personalInfo.linkedin && <span>{resume.personalInfo.linkedin}</span>}
                        {resume.personalInfo.website && <span> • {resume.personalInfo.website}</span>}
                    </div>
                )}
            </div>

            {resume.personalInfo?.summary && (
                <div className="preview-section">
                    <div className="preview-section-title">SUMMARY</div>
                    <div className="preview-summary">{resume.personalInfo.summary}</div>
                </div>
            )}

            {resume.experience?.length > 0 && (
                <div className="preview-section">
                    <div className="preview-section-title">WORK EXPERIENCE</div>
                    {resume.experience.map((exp, index) => (
                        <div key={index} className="preview-item">
                            <div className="preview-item-header">
                                <div>
                                    <div className="preview-item-title">{exp.position}</div>
                                    <div className="preview-item-subtitle">{exp.company} • {exp.location}</div>
                                </div>
                                <div className="preview-item-date">
                                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                </div>
                            </div>
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
                                <div>
                                    <div className="preview-item-title">{edu.degree} in {edu.field}</div>
                                    <div className="preview-item-subtitle">{edu.institution} • {edu.location}</div>
                                </div>
                                <div className="preview-item-date">
                                    {edu.startDate} - {edu.endDate}
                                </div>
                            </div>
                            {edu.gpa && <div className="preview-item-description">GPA: {edu.gpa}</div>}
                        </div>
                    ))}
                </div>
            )}

            {resume.skills && (
                <div className="preview-section">
                    <div className="preview-section-title">SKILLS</div>
                    {resume.skills.technical?.length > 0 && (
                        <div className="preview-skills"><strong>Technical:</strong> {resume.skills.technical.join(', ')}</div>
                    )}
                    {resume.skills.tools?.length > 0 && (
                        <div className="preview-skills"><strong>Tools:</strong> {resume.skills.tools.join(', ')}</div>
                    )}
                    {resume.skills.soft?.length > 0 && (
                        <div className="preview-skills"><strong>Soft Skills:</strong> {resume.skills.soft.join(', ')}</div>
                    )}
                    {resume.skills.languages?.length > 0 && (
                        <div className="preview-skills"><strong>Languages:</strong> {resume.skills.languages.join(', ')}</div>
                    )}
                </div>
            )}

            {resume.projects?.length > 0 && (
                <div className="preview-section">
                    <div className="preview-section-title">PROJECTS</div>
                    {resume.projects.map((project, index) => (
                        <div key={index} className="preview-item">
                            <div className="preview-item-title">{project.name}</div>
                            {project.technologies?.length > 0 && (
                                <div className="preview-item-subtitle">Technologies: {project.technologies.join(', ')}</div>
                            )}
                            {project.description && <div className="preview-item-description">{project.description}</div>}
                            {project.link && <div className="preview-item-link">{project.link}</div>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ModernTemplate;
