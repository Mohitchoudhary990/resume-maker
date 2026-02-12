import React, { useState, useEffect } from 'react';
import { suggestSkills } from '../services/aiService';

const Skills = ({ data, onChange }) => {
    const [skills, setSkills] = useState({
        technical: [],
        soft: [],
        languages: [],
        tools: [],
        ...data
    });
    const [newSkill, setNewSkill] = useState({ category: 'technical', value: '' });
    const [suggesting, setSuggesting] = useState(false);

    useEffect(() => {
        onChange(skills);
    }, [skills]);

    const addSkill = (category) => {
        if (!newSkill.value.trim()) return;

        setSkills({
            ...skills,
            [category]: [...skills[category], newSkill.value.trim()]
        });
        setNewSkill({ ...newSkill, value: '' });
    };

    const removeSkill = (category, index) => {
        setSkills({
            ...skills,
            [category]: skills[category].filter((_, i) => i !== index)
        });
    };

    const handleSuggestSkills = async () => {
        setSuggesting(true);
        try {
            const response = await suggestSkills({
                position: 'Software Engineer',
                experience: [],
                currentSkills: skills.technical
            });

            if (response.success && response.data.skills) {
                setSkills({
                    ...skills,
                    technical: [...new Set([...skills.technical, ...response.data.skills])]
                });
            }
        } catch (err) {
            console.error('Failed to suggest skills:', err);
        } finally {
            setSuggesting(false);
        }
    };

    const renderSkillCategory = (category, title) => (
        <div className="skill-category">
            <h3>{title}</h3>
            <div className="skill-tags">
                {skills[category].map((skill, index) => (
                    <div key={index} className="skill-tag">
                        <span>{skill}</span>
                        <button
                            onClick={() => removeSkill(category, index)}
                            className="skill-remove"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex gap-2 mt-2">
                <input
                    type="text"
                    className="form-input"
                    placeholder={`Add ${title.toLowerCase()}`}
                    value={newSkill.category === category ? newSkill.value : ''}
                    onChange={(e) => setNewSkill({ category, value: e.target.value })}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            addSkill(category);
                        }
                    }}
                />
                <button
                    onClick={() => addSkill(category)}
                    className="btn btn-primary btn-sm"
                >
                    Add
                </button>
            </div>
        </div>
    );

    return (
        <div className="section-form fade-in">
            <div className="section-header">
                <div>
                    <h2>Skills</h2>
                    <p>Showcase your abilities and expertise</p>
                </div>
                <button
                    onClick={handleSuggestSkills}
                    className="btn btn-accent"
                    disabled={suggesting}
                >
                    {suggesting ? 'Suggesting...' : '✨ Suggest Skills with AI'}
                </button>
            </div>

            <div className="skills-grid">
                {renderSkillCategory('technical', 'Technical Skills')}
                {renderSkillCategory('tools', 'Tools & Technologies')}
                {renderSkillCategory('soft', 'Soft Skills')}
                {renderSkillCategory('languages', 'Languages')}
            </div>
        </div>
    );
};

export default Skills;
