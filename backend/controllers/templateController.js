import Template from '../models/Template.js';

// @desc    Get all active templates
// @route   GET /api/templates
// @access  Public
export const getTemplates = async (req, res) => {
    try {
        // Fetch all active templates, sort system first then newest custom
        const templates = await Template.find({ active: true }).sort({ type: -1, createdAt: -1 });
        res.status(200).json({ success: true, count: templates.length, data: templates });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create a new template
// @route   POST /api/templates
// @access  Private/Admin
export const createTemplate = async (req, res) => {
    try {
        const { name, description, content, thumbnail } = req.body;

        // Generate a simplified key from name
        const key = name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now();

        const template = await Template.create({
            name,
            key,
            description,
            type: 'custom',
            content,
            thumbnail
        });

        res.status(201).json({ success: true, data: template });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete (deactivate) a template
// @route   DELETE /api/templates/:id
// @access  Private/Admin
export const deleteTemplate = async (req, res) => {
    try {
        const template = await Template.findById(req.params.id);

        if (!template) {
            return res.status(404).json({ success: false, message: 'Template not found' });
        }

        if (template.type === 'system') {
            return res.status(403).json({ success: false, message: 'Cannot delete system templates' });
        }

        // Hard delete or Soft delete? User said "delete", let's do hard delete for custom ones to keep it clean, 
        // or toggle active. Let's do hard delete for now as per "delete the recent one".
        await template.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Seed system templates
// @route   POST /api/templates/seed
// @access  Private/Admin
export const seedTemplates = async (req, res) => {
    try {
        const systemTemplates = [
            { name: 'Modern', key: 'modern', description: 'Clean and widely used', type: 'system', color: '#2563eb' },
            { name: 'Professional', key: 'professional', description: 'Corporate and structured', type: 'system', color: '#2c3e50' },
            { name: 'Minimal', key: 'minimal', description: 'Simple and clean whitespace', type: 'system', color: '#444' },
            { name: 'Classic', key: 'classic', description: 'Traditional serif style', type: 'system', color: '#000' },
            { name: 'Creative', key: 'creative', description: 'Bold and colorful', type: 'system', color: '#FF6B6B' },
            { name: 'Elegant', key: 'elegant', description: 'Sophisticated and refined', type: 'system', color: '#D4AF37' }
        ];

        // Upsert system templates
        for (const tmpl of systemTemplates) {
            await Template.findOneAndUpdate(
                { key: tmpl.key },
                { ...tmpl, active: true },
                { upsert: true, new: true }
            );
        }

        res.status(200).json({ success: true, message: 'System templates seeded' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
