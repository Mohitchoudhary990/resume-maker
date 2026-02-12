import React, { useState, useEffect } from 'react';
import { generateProjectDescription } from '../services/aiService';

const Projects = ({ data, onChange }) => {
    const [projects, setProjects] = useState(data || []);

    useEffect(() => {
        onChange(projects);
    }, [projects]);

    const addProject = () => {
        setProjects([
            ...projects,
            {
                name: '',
                description: '',
                technologies: [],
                link: '',
                highlights: []
            }
        ]);
    };

    const removeProject = (index) => {
        setProjects(projects.filter((_, i) => i !== index));
    };

    const updateProject = (index, field, value) => {
        const updated = [...projects];
        updated[index][field] = value;
        setProjects(updated);
    };

    const addTechnology = (index, tech) => {
        if (!tech.trim()) return;
        const updated = [...projects];
        updated[index].technologies = [...updated[index].technologies, tech.trim()];
        setProjects(updated);
    };

    const removeTechnology = (projectIndex, techIndex) => {
        const updated = [...projects];
        updated[projectIndex].technologies = updated[projectIndex].technologies.filter((_, i) => i !== techIndex);
        setProjects(updated);
    };

    const handleGenerateDescription = async (index) => {
        const project = projects[index];
        if (!project.name || project.technologies.length === 0) return;

        try {
            const response = await generateProjectDescription({
                projectName: project.name,
                technologies: project.technologies
            });

            if (response.success) {
                updateProject(index, 'description', response.data.description);
            }
        } catch (err) {
            console.error('Failed to generate description:', err);
        }
    };

    return (
        <div className="section-form fade-in">
            <div className="section-header">
                <h2>Projects</h2>
                <p>Highlight your notable projects</p>
            </div>

            {projects.map((project, index) => (
                <div key={index} className="project-item card mb-3">
                    <div className="flex justify-between items-center mb-3">
                        <h3>Project #{index + 1}</h3>
                        <button
                            onClick={() => removeProject(index)}
                            className="btn btn-secondary btn-sm"
                        >
                            Remove
                        </button>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Project Name</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="E-commerce Platform"
                            value={project.name}
                            onChange={(e) => updateProject(index, 'name', e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Technologies Used</label>
                        <div className="skill-tags mb-2">
                            {project.technologies.map((tech, techIndex) => (
                                <div key={techIndex} className="skill-tag">
                                    <span>{tech}</span>
                                    <button
                                        onClick={() => removeTechnology(index, techIndex)}
                                        className="skill-remove"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Add technology (press Enter)"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addTechnology(index, e.target.value);
                                    e.target.value = '';
                                }
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <div className="flex justify-between items-center mb-2">
                            <label className="form-label">Description</label>
                            <button
                                onClick={() => handleGenerateDescription(index)}
                                className="btn btn-accent btn-sm"
                            >
                                ✨ Generate with AI
                            </button>
                        </div>
                        <textarea
                            className="form-textarea"
                            placeholder="Describe your project and its impact..."
                            value={project.description}
                            onChange={(e) => updateProject(index, 'description', e.target.value)}
                            rows="4"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Project Link (Optional)</label>
                        <input
                            type="url"
                            className="form-input"
                            placeholder="https://github.com/username/project"
                            value={project.link}
                            onChange={(e) => updateProject(index, 'link', e.target.value)}
                        />
                    </div>
                </div>
            ))}

            <button onClick={addProject} className="btn btn-primary">
                + Add Project
            </button>
        </div>
    );
};

export default Projects;
