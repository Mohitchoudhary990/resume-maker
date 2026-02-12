import React, { useState, useEffect } from 'react';

const Education = ({ data, onChange }) => {
    const [education, setEducation] = useState(data || []);

    useEffect(() => {
        onChange(education);
    }, [education]);

    const addEducation = () => {
        setEducation([
            ...education,
            {
                institution: '',
                degree: '',
                field: '',
                location: '',
                startDate: '',
                endDate: '',
                gpa: '',
                achievements: []
            }
        ]);
    };

    const removeEducation = (index) => {
        setEducation(education.filter((_, i) => i !== index));
    };

    const updateEducation = (index, field, value) => {
        const updated = [...education];
        updated[index][field] = value;
        setEducation(updated);
    };

    return (
        <div className="section-form fade-in">
            <div className="section-header">
                <h2>Education</h2>
                <p>Add your educational background</p>
            </div>

            {education.map((edu, index) => (
                <div key={index} className="education-item card mb-3">
                    <div className="flex justify-between items-center mb-3">
                        <h3>Education #{index + 1}</h3>
                        <button
                            onClick={() => removeEducation(index)}
                            className="btn btn-secondary btn-sm"
                        >
                            Remove
                        </button>
                    </div>

                    <div className="form-grid grid-2">
                        <div className="form-group">
                            <label className="form-label">Institution</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Stanford University"
                                value={edu.institution}
                                onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Degree</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Bachelor of Science"
                                value={edu.degree}
                                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Field of Study</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Computer Science"
                                value={edu.field}
                                onChange={(e) => updateEducation(index, 'field', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Location</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Stanford, CA"
                                value={edu.location}
                                onChange={(e) => updateEducation(index, 'location', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Start Date</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Sep 2016"
                                value={edu.startDate}
                                onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">End Date</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Jun 2020"
                                value={edu.endDate}
                                onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">GPA (Optional)</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="3.8/4.0"
                                value={edu.gpa}
                                onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ))}

            <button onClick={addEducation} className="btn btn-primary">
                + Add Education
            </button>
        </div>
    );
};

export default Education;
