import React, { useState, useEffect } from 'react';
import '../styles/ResumeBuilder.css';
import { getTemplates } from '../services/templateService';

const TemplateSelection = ({ currentTemplate, onChange }) => {
    const [templates, setTemplates] = useState([]);

    // Default fallback in case API fails or during initial load
    const systemFallback = [
        { id: 'modern', name: 'Modern', description: 'Clean and widely used', color: '#2563eb', key: 'modern' },
        { id: 'professional', name: 'Professional', description: 'Corporate and structured', color: '#2c3e50', key: 'professional' },
        { id: 'minimal', name: 'Minimal', description: 'Simple and clean whitespace', color: '#444', key: 'minimal' },
        { id: 'classic', name: 'Classic', description: 'Traditional serif style', color: '#000', key: 'classic' },
        { id: 'creative', name: 'Creative', description: 'Bold and colorful', color: '#FF6B6B', key: 'creative' },
        { id: 'elegant', name: 'Elegant', description: 'Sophisticated and refined', color: '#D4AF37', key: 'elegant' }
    ];

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const res = await getTemplates();
                if (res.success && res.data.length > 0) {
                    setTemplates(res.data);
                } else {
                    setTemplates(systemFallback);
                }
            } catch (err) {
                console.error(err);
                setTemplates(systemFallback);
            }
        };

        fetchTemplates();
    }, []);

    const getColor = (template) => {
        if (template.color) return template.color;
        // Generate a consistent color from name if missing
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    };

    return (
        <div className="section-form">
            <div className="section-header">
                <h3>Choose a Template</h3>
                <p>Select a design that matches your industry and personality</p>
            </div>

            <div className="form-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                {templates.map((template) => (
                    <div
                        key={template._id || template.id} // use _id from DB or id from fallback
                        onClick={() => onChange(template.key || template.id)}
                        style={{
                            border: currentTemplate === (template.key || template.id) ? `3px solid ${template.color || '#2563eb'}` : '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '1.5rem',
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'all 0.2s ease',
                            backgroundColor: currentTemplate === (template.key || template.id) ? `${template.color || '#2563eb'}10` : 'white',
                            boxShadow: currentTemplate === (template.key || template.id) ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
                        }}
                    >
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: template.color || '#2563eb',
                            margin: '0 auto 1rem auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '1.2rem'
                        }}>
                            {(template.name || 'U').charAt(0)}
                        </div>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{template.name}</h4>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>{template.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TemplateSelection;
