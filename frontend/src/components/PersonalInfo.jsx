import React, { useState, useEffect } from 'react';
import { generateSummary } from '../services/aiService';

const PersonalInfo = ({ data, onChange }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        website: '',
        summary: '',
        ...data
    });
    const [generatingSummary, setGeneratingSummary] = useState(false);

    useEffect(() => {
        onChange(formData);
    }, [formData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleGenerateSummary = async () => {
        setGeneratingSummary(true);
        try {
            console.log('Generating summary with data:', {
                personalInfo: formData,
                experience: [],
                education: []
            });

            const response = await generateSummary({
                personalInfo: formData,
                experience: [],
                education: []
            });

            console.log('Summary response:', response);

            if (response.success) {
                setFormData({
                    ...formData,
                    summary: response.data.summary
                });
                alert('✅ Summary generated successfully!');
            } else {
                alert('❌ Failed to generate summary: ' + (response.message || 'Unknown error'));
            }
        } catch (err) {
            console.error('Failed to generate summary:', err);
            alert('❌ Error: ' + (err.response?.data?.message || err.message || 'Failed to generate summary. Please try again.'));
        } finally {
            setGeneratingSummary(false);
        }
    };

    return (
        <div className="section-form fade-in">
            <div className="section-header">
                <h2>Personal Information</h2>
                <p>Tell us about yourself</p>
            </div>

            <div className="form-grid grid-2">
                <div className="form-group">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className="form-input"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-input"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-input"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        className="form-input"
                        placeholder="New York, NY"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="linkedin" className="form-label">LinkedIn</label>
                    <input
                        type="url"
                        id="linkedin"
                        name="linkedin"
                        className="form-input"
                        placeholder="linkedin.com/in/johndoe"
                        value={formData.linkedin}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="website" className="form-label">Website/Portfolio</label>
                    <input
                        type="url"
                        id="website"
                        name="website"
                        className="form-input"
                        placeholder="johndoe.com"
                        value={formData.website}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-group">
                <div className="flex justify-between items-center mb-2">
                    <label htmlFor="summary" className="form-label">Professional Summary</label>
                    <button
                        onClick={handleGenerateSummary}
                        className="btn btn-accent btn-sm"
                        disabled={generatingSummary}
                    >
                        {generatingSummary ? 'Generating...' : '✨ Generate with AI'}
                    </button>
                </div>
                <textarea
                    id="summary"
                    name="summary"
                    className="form-textarea"
                    placeholder="A brief professional summary highlighting your key strengths and experience..."
                    value={formData.summary}
                    onChange={handleChange}
                    rows="5"
                />
            </div>
        </div>
    );
};

export default PersonalInfo;
