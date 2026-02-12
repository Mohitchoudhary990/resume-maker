import React, { useState, useEffect } from 'react';
import { getTemplates, createTemplate, deleteTemplate, seedTemplates } from '../../services/templateService';

const TemplateManager = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        content: '<div class="custom-template">\n  <h1>{{personalInfo.fullName}}</h1>\n  <p>{{personalInfo.email}}</p>\n</div>',
        thumbnail: ''
    });

    useEffect(() => {
        loadTemplates();
    }, []);

    const loadTemplates = async () => {
        try {
            const response = await getTemplates();
            if (response.success) {
                setTemplates(response.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSeed = async () => {
        try {
            await seedTemplates();
            loadTemplates();
            alert('System templates seeded successfully');
        } catch (error) {
            alert(error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this template?')) {
            try {
                await deleteTemplate(id);
                setTemplates(templates.filter(t => t._id !== id));
            } catch (error) {
                alert(error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTemplate(formData);
            setShowForm(false);
            setFormData({ name: '', description: '', content: '', thumbnail: '' });
            loadTemplates();
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="template-manager">
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Template Management</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={handleSeed} className="btn btn-secondary btn-sm">Reset System Templates</button>
                    <button onClick={() => setShowForm(!showForm)} className="btn btn-primary btn-sm">
                        {showForm ? 'Cancel' : 'Add New Template'}
                    </button>
                </div>
            </div>

            {showForm && (
                <div className="template-form card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
                    <h3>Add Custom Template</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Template Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type="text"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>HTML/Handlebars Content</label>
                            <textarea
                                value={formData.content}
                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                required
                                className="form-control"
                                rows="10"
                                style={{ fontFamily: 'monospace' }}
                            />
                            <small className="text-muted">Use {"{{variable}}"} for placeholders. Example: {"{{personalInfo.fullName}}"}</small>
                        </div>
                        <button type="submit" className="btn btn-success" style={{ marginTop: '1rem' }}>Create Template</button>
                    </form>
                </div>
            )}

            <div className="templates-list">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Key</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {templates.map(template => (
                            <tr key={template._id}>
                                <td>{template.name}</td>
                                <td>
                                    <span className={`badge ${template.type === 'system' ? 'badge-info' : 'badge-warning'}`}>
                                        {template.type}
                                    </span>
                                </td>
                                <td>{template.key}</td>
                                <td>{template.active ? 'Active' : 'Inactive'}</td>
                                <td>
                                    {template.type === 'custom' && (
                                        <button
                                            onClick={() => handleDelete(template._id)}
                                            className="btn-delete"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TemplateManager;
