import React, { useState, useEffect } from 'react';
import { generatePDF } from '../services/aiService';
import { getTemplates } from '../services/templateService';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import ElegantTemplate from './templates/ElegantTemplate';
import CustomTemplateRenderer from './templates/CustomTemplateRenderer';

const ResumePreview = ({ resume }) => {
    const [templateData, setTemplateData] = useState(null);

    useEffect(() => {
        const fetchTemplateInfo = async () => {
            if (resume?.template) {
                // Check if it's a known system template first to avoid unnecessary calls if we want optimization,
                // but simpler to just fetch all matching logic or fetch by key.
                // However, for efficiency, if it's one of the standard keys, we just render.
                // But wait, "custom" templates might have arbitrary keys.
                // We need to know IF the current resume.template maps to a custom one.

                // Strategy: Fetch all templates (cached ideally) or find specific one.
                // For now, let's fetch all and find. 
                try {
                    const res = await getTemplates();
                    if (res.success) {
                        const found = res.data.find(t => t.key === resume.template);
                        setTemplateData(found);
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        };
        fetchTemplateInfo();
    }, [resume?.template]);

    if (!resume) {
        return (
            <div className="preview-empty">
                <p>No resume data to preview</p>
            </div>
        );
    }

    const handleDownloadPDF = async () => {
        try {
            const pdfBlob = await generatePDF(resume._id);
            const url = window.URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${resume.title || 'resume'}.pdf`;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Failed to generate PDF:', err);
        }
    };

    const renderTemplate = () => {
        const templateKey = resume.template || 'modern';

        switch (templateKey) {
            case 'modern':
                return <ModernTemplate resume={resume} />;
            case 'classic':
                return <ClassicTemplate resume={resume} />;
            case 'creative':
                return <CreativeTemplate resume={resume} />;
            case 'minimal':
                return <MinimalTemplate resume={resume} />;
            case 'professional':
                return <ProfessionalTemplate resume={resume} />;
            case 'elegant':
                return <ElegantTemplate resume={resume} />;
        }

        if (templateData && templateData.type === 'custom' && templateData.content) {
            return <CustomTemplateRenderer resume={resume} content={templateData.content} />;
        }

        return <ModernTemplate resume={resume} />;
    };

    return (
        <div className="resume-preview">
            <div className="preview-header">
                <h3>Live Preview</h3>
                <button onClick={handleDownloadPDF} className="btn btn-accent btn-sm">
                    📥 Download PDF
                </button>
            </div>

            <div className="preview-content">
                <div className="preview-paper">
                    {renderTemplate()}
                </div>
            </div>
        </div>
    );
};

export default ResumePreview;
