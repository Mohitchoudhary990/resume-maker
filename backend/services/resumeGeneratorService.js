import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

class ResumeGeneratorService {
    // Generate PDF for resume
    async generateResumePDF(resumeData, template = 'modern') {
        return new Promise((resolve, reject) => {
            try {
                const doc = new PDFDocument({
                    size: 'A4',
                    margins: { top: 50, bottom: 50, left: 50, right: 50 }
                });

                const chunks = [];

                doc.on('data', chunk => chunks.push(chunk));
                doc.on('end', () => {
                    const pdfBuffer = Buffer.concat(chunks);
                    resolve(pdfBuffer);
                });
                doc.on('error', reject);

                // Apply template styling
                this.applyTemplate(doc, template);

                // Add content based on template
                this.addPersonalInfo(doc, resumeData.personalInfo);

                if (resumeData.personalInfo.summary) {
                    this.addSection(doc, 'Professional Summary', resumeData.personalInfo.summary);
                }

                if (resumeData.experience && resumeData.experience.length > 0) {
                    this.addExperienceSection(doc, resumeData.experience);
                }

                if (resumeData.education && resumeData.education.length > 0) {
                    this.addEducationSection(doc, resumeData.education);
                }

                if (resumeData.skills) {
                    this.addSkillsSection(doc, resumeData.skills);
                }

                if (resumeData.projects && resumeData.projects.length > 0) {
                    this.addProjectsSection(doc, resumeData.projects);
                }

                if (resumeData.certifications && resumeData.certifications.length > 0) {
                    this.addCertificationsSection(doc, resumeData.certifications);
                }

                doc.end();
            } catch (error) {
                reject(error);
            }
        });
    }

    applyTemplate(doc, template) {
        // Template-specific styling can be added here
        this.primaryColor = template === 'modern' ? '#2563eb' :
            template === 'creative' ? '#7c3aed' :
                template === 'minimal' ? '#000000' : '#1f2937';
    }

    addPersonalInfo(doc, personalInfo) {
        // Name
        doc.fontSize(24)
            .fillColor(this.primaryColor)
            .font('Helvetica-Bold')
            .text(personalInfo.fullName || 'Your Name', { align: 'center' });

        doc.moveDown(0.5);

        // Contact info
        const contactInfo = [];
        if (personalInfo.email) contactInfo.push(personalInfo.email);
        if (personalInfo.phone) contactInfo.push(personalInfo.phone);
        if (personalInfo.location) contactInfo.push(personalInfo.location);

        if (contactInfo.length > 0) {
            doc.fontSize(10)
                .fillColor('#666666')
                .font('Helvetica')
                .text(contactInfo.join(' • '), { align: 'center' });
        }

        // Links
        const links = [];
        if (personalInfo.linkedin) links.push(personalInfo.linkedin);
        if (personalInfo.website) links.push(personalInfo.website);

        if (links.length > 0) {
            doc.fontSize(10)
                .fillColor('#2563eb')
                .text(links.join(' • '), { align: 'center' });
        }

        doc.moveDown(1);
        this.addHorizontalLine(doc);
        doc.moveDown(0.5);
    }

    addSection(doc, title, content) {
        doc.fontSize(14)
            .fillColor(this.primaryColor)
            .font('Helvetica-Bold')
            .text(title.toUpperCase());

        doc.moveDown(0.3);

        doc.fontSize(10)
            .fillColor('#000000')
            .font('Helvetica')
            .text(content, { align: 'justify' });

        doc.moveDown(1);
    }

    addExperienceSection(doc, experiences) {
        doc.fontSize(14)
            .fillColor(this.primaryColor)
            .font('Helvetica-Bold')
            .text('WORK EXPERIENCE');

        doc.moveDown(0.5);

        experiences.forEach((exp, index) => {
            // Company and position
            doc.fontSize(12)
                .fillColor('#000000')
                .font('Helvetica-Bold')
                .text(exp.position || 'Position');

            doc.fontSize(10)
                .fillColor('#666666')
                .font('Helvetica')
                .text(`${exp.company || 'Company'} | ${exp.location || ''}`);

            const endDate = exp.current ? 'Present' : exp.endDate;
            doc.fontSize(9)
                .fillColor('#888888')
                .font('Helvetica-Oblique')
                .text(`${exp.startDate || ''} - ${endDate || ''}`);

            doc.moveDown(0.3);

            // Description
            if (exp.description) {
                doc.fontSize(10)
                    .fillColor('#000000')
                    .font('Helvetica')
                    .text(exp.description);
            }

            // Highlights
            if (exp.highlights && exp.highlights.length > 0) {
                exp.highlights.forEach(highlight => {
                    doc.fontSize(10)
                        .fillColor('#000000')
                        .font('Helvetica')
                        .text(`• ${highlight}`, { indent: 10 });
                });
            }

            if (index < experiences.length - 1) {
                doc.moveDown(0.8);
            }
        });

        doc.moveDown(1);
    }

    addEducationSection(doc, education) {
        doc.fontSize(14)
            .fillColor(this.primaryColor)
            .font('Helvetica-Bold')
            .text('EDUCATION');

        doc.moveDown(0.5);

        education.forEach((edu, index) => {
            doc.fontSize(12)
                .fillColor('#000000')
                .font('Helvetica-Bold')
                .text(`${edu.degree || 'Degree'} in ${edu.field || 'Field'}`);

            doc.fontSize(10)
                .fillColor('#666666')
                .font('Helvetica')
                .text(`${edu.institution || 'Institution'} | ${edu.location || ''}`);

            const dateText = `${edu.startDate || ''} - ${edu.endDate || ''}`;
            if (edu.gpa) {
                doc.fontSize(9)
                    .fillColor('#888888')
                    .font('Helvetica-Oblique')
                    .text(`${dateText} | GPA: ${edu.gpa}`);
            } else {
                doc.fontSize(9)
                    .fillColor('#888888')
                    .font('Helvetica-Oblique')
                    .text(dateText);
            }

            if (edu.achievements && edu.achievements.length > 0) {
                doc.moveDown(0.3);
                edu.achievements.forEach(achievement => {
                    doc.fontSize(10)
                        .fillColor('#000000')
                        .font('Helvetica')
                        .text(`• ${achievement}`, { indent: 10 });
                });
            }

            if (index < education.length - 1) {
                doc.moveDown(0.8);
            }
        });

        doc.moveDown(1);
    }

    addSkillsSection(doc, skills) {
        doc.fontSize(14)
            .fillColor(this.primaryColor)
            .font('Helvetica-Bold')
            .text('SKILLS');

        doc.moveDown(0.5);

        if (skills.technical && skills.technical.length > 0) {
            doc.fontSize(10)
                .fillColor('#000000')
                .font('Helvetica-Bold')
                .text('Technical: ', { continued: true })
                .font('Helvetica')
                .text(skills.technical.join(', '));
            doc.moveDown(0.3);
        }

        if (skills.tools && skills.tools.length > 0) {
            doc.fontSize(10)
                .fillColor('#000000')
                .font('Helvetica-Bold')
                .text('Tools: ', { continued: true })
                .font('Helvetica')
                .text(skills.tools.join(', '));
            doc.moveDown(0.3);
        }

        if (skills.soft && skills.soft.length > 0) {
            doc.fontSize(10)
                .fillColor('#000000')
                .font('Helvetica-Bold')
                .text('Soft Skills: ', { continued: true })
                .font('Helvetica')
                .text(skills.soft.join(', '));
            doc.moveDown(0.3);
        }

        if (skills.languages && skills.languages.length > 0) {
            doc.fontSize(10)
                .fillColor('#000000')
                .font('Helvetica-Bold')
                .text('Languages: ', { continued: true })
                .font('Helvetica')
                .text(skills.languages.join(', '));
        }

        doc.moveDown(1);
    }

    addProjectsSection(doc, projects) {
        doc.fontSize(14)
            .fillColor(this.primaryColor)
            .font('Helvetica-Bold')
            .text('PROJECTS');

        doc.moveDown(0.5);

        projects.forEach((project, index) => {
            doc.fontSize(12)
                .fillColor('#000000')
                .font('Helvetica-Bold')
                .text(project.name || 'Project Name');

            if (project.technologies && project.technologies.length > 0) {
                doc.fontSize(9)
                    .fillColor('#666666')
                    .font('Helvetica-Oblique')
                    .text(`Technologies: ${project.technologies.join(', ')}`);
            }

            doc.moveDown(0.3);

            if (project.description) {
                doc.fontSize(10)
                    .fillColor('#000000')
                    .font('Helvetica')
                    .text(project.description);
            }

            if (project.highlights && project.highlights.length > 0) {
                project.highlights.forEach(highlight => {
                    doc.fontSize(10)
                        .fillColor('#000000')
                        .font('Helvetica')
                        .text(`• ${highlight}`, { indent: 10 });
                });
            }

            if (project.link) {
                doc.fontSize(9)
                    .fillColor('#2563eb')
                    .font('Helvetica')
                    .text(project.link);
            }

            if (index < projects.length - 1) {
                doc.moveDown(0.8);
            }
        });

        doc.moveDown(1);
    }

    addCertificationsSection(doc, certifications) {
        doc.fontSize(14)
            .fillColor(this.primaryColor)
            .font('Helvetica-Bold')
            .text('CERTIFICATIONS');

        doc.moveDown(0.5);

        certifications.forEach((cert, index) => {
            doc.fontSize(11)
                .fillColor('#000000')
                .font('Helvetica-Bold')
                .text(cert.name || 'Certification Name');

            doc.fontSize(10)
                .fillColor('#666666')
                .font('Helvetica')
                .text(`${cert.issuer || 'Issuer'} | ${cert.date || ''}`);

            if (index < certifications.length - 1) {
                doc.moveDown(0.5);
            }
        });

        doc.moveDown(1);
    }

    addHorizontalLine(doc) {
        doc.strokeColor('#cccccc')
            .lineWidth(1)
            .moveTo(50, doc.y)
            .lineTo(545, doc.y)
            .stroke();
    }
}

export default new ResumeGeneratorService();
