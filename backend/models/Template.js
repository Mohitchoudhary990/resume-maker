import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    key: {
        type: String,
        required: true,
        unique: true,
        description: 'Unique identifier for logic mapping (e.g., "modern", "custom-1")'
    },
    description: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        enum: ['system', 'custom'],
        default: 'custom'
    },
    content: {
        type: String, // HTML/Handlebars content for custom templates
        default: ''
    },
    thumbnail: {
        type: String, // URL or base64 placeholder
        default: ''
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Template = mongoose.model('Template', templateSchema);

export default Template;
