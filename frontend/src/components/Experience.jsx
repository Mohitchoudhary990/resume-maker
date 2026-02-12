import React, { useState, useEffect } from 'react';
import { improveDescription } from '../services/aiService';

const Experience = ({ data, onChange }) => {
    const [experiences, setExperiences] = useState(data || []);

    useEffect(() => {
        onChange(experiences);
    }, [experiences]);

    const addExperience = () => {
        setExperiences([
            ...experiences,
            {
                company: '',
                position: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
                highlights: []
            }
        ]);
    };

    const removeExperience = (index) => {
        setExperiences(experiences.filter((_, i) => i !== index));
    };

    const updateExperience = (index, field, value) => {
        const updated = [...experiences];
        updated[index][field] = value;
        setExperiences(updated);
    };

    const handleImproveDescription = async (index) => {
        const exp = experiences[index];
        if (!exp.description || !exp.position) return;

        try {
            const response = await improveDescription({
                description: exp.description,
                position: exp.position,
                company: exp.company
            });

            if (response.success) {
                updateExperience(index, 'description', response.data.improvedDescription);
            }
        } catch (err) {
            console.error('Failed to improve description:', err);
        }
    };

    return (
        <div className="section-form fade-in">
            <div className="section-header">
                <h2>Work Experience</h2>
                <p>Add your professional experience</p>
            </div>

            {experiences.map((exp, index) => (
                <div key={index} className="experience-item card mb-3">
                    <div className="flex justify-between items-center mb-3">
                        <h3>Experience #{index + 1}</h3>
                        <button
                            onClick={() => removeExperience(index)}
                            className="btn btn-secondary btn-sm"
                        >
                            Remove
                        </button>
                    </div>

                    <div className="form-grid grid-2">
                        <div className="form-group">
                            <label className="form-label">Company</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Google"
                                value={exp.company}
                                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Position</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Software Engineer"
                                value={exp.position}
                                onChange={(e) => updateExperience(index, 'position', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Location</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="San Francisco, CA"
                                value={exp.location}
                                onChange={(e) => updateExperience(index, 'location', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Start Date</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Jan 2020"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">End Date</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Dec 2022"
                                value={exp.endDate}
                                onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                                disabled={exp.current}
                            />
                        </div>

                        <div className="form-group flex items-center">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={exp.current}
                                    onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                                />
                                <span>Currently working here</span>
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="flex justify-between items-center mb-2">
                            <label className="form-label">Description</label>
                            <button
                                onClick={() => handleImproveDescription(index)}
                                className="btn btn-accent btn-sm"
                            >
                                ✨ Improve with AI
                            </button>
                        </div>
                        <textarea
                            className="form-textarea"
                            placeholder="Describe your responsibilities and achievements..."
                            value={exp.description}
                            onChange={(e) => updateExperience(index, 'description', e.target.value)}
                            rows="4"
                        />
                    </div>
                </div>
            ))}

            <button onClick={addExperience} className="btn btn-primary">
                + Add Experience
            </button>
        </div>
    );
};

export default Experience;
