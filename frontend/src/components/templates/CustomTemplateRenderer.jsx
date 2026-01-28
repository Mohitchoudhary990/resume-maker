import React, { useEffect, useState } from 'react';
import Handlebars from 'handlebars';
import '../../styles/ResumeTemplates.css';

const CustomTemplateRenderer = ({ resume, content }) => {
    const [html, setHtml] = useState('');

    useEffect(() => {
        if (resume && content) {
            try {
                // Register helpers if needed (e.g., loops are built-in: {{#each experience}}...{{/each}})
                const template = Handlebars.compile(content);
                const result = template(resume);
                setHtml(result);
            } catch (err) {
                console.error('Template rendering error:', err);
                setHtml('<p style="color:red">Error rendering template</p>');
            }
        }
    }, [resume, content]);

    return (
        <div
            className="preview-inner"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};

export default CustomTemplateRenderer;
