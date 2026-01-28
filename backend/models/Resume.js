import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        default: 'Untitled Resume'
    },
    template: {
        type: String,
        enum: ['modern', 'classic', 'creative', 'minimal', 'professional', 'elegant'],
        default: 'modern'
    },
    personalInfo: {
        fullName: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        location: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        website: { type: String, default: '' },
        summary: { type: String, default: '' }
    },
    experience: [{
        company: { type: String, default: '' },
        position: { type: String, default: '' },
        location: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        current: { type: Boolean, default: false },
        description: { type: String, default: '' },
        highlights: [{ type: String }]
    }],
    education: [{
        institution: { type: String, default: '' },
        degree: { type: String, default: '' },
        field: { type: String, default: '' },
        location: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        gpa: { type: String, default: '' },
        achievements: [{ type: String }]
    }],
    skills: {
        technical: [{ type: String }],
        soft: [{ type: String }],
        languages: [{ type: String }],
        tools: [{ type: String }]
    },
    projects: [{
        name: { type: String, default: '' },
        description: { type: String, default: '' },
        technologies: [{ type: String }],
        link: { type: String, default: '' },
        highlights: [{ type: String }]
    }],
    certifications: [{
        name: { type: String, default: '' },
        issuer: { type: String, default: '' },
        date: { type: String, default: '' },
        link: { type: String, default: '' }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
resumeSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
