import Groq from 'groq-sdk';
import 'dotenv/config';

// Check if API key is set
if (!process.env.GROQ_API_KEY) {
    console.error('❌ GROQ_API_KEY is not set in environment variables!');
} else {
    console.log('✅ GROQ_API_KEY is set');
}

// Initialize Groq client
// Using fallback key to prevent crash on startup if key is missing
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || 'dummy-key',
});

class GroqService {
    constructor() {
        // Using Llama 3.3 70B Versatile (current stable model)
        this.model = 'llama-3.3-70b-versatile';
        console.log(`🚀 Groq Service initialized with model: ${this.model}`);
    }

    // Generate professional summary based on user's experience
    async generateSummary(personalInfo, experience, education) {
        try {
            console.log('🔄 Generating summary for:', personalInfo?.fullName || 'Unknown');

            const prompt = `Create a professional resume summary (2-3 sentences) for a candidate with the following background:
      
Name: ${personalInfo?.fullName || 'Professional'}
Experience: ${experience?.map(exp => `${exp.position} at ${exp.company}`).join(', ') || 'Entry level'}
Education: ${education?.map(edu => `${edu.degree} in ${edu.field} from ${edu.institution}`).join(', ') || 'Not specified'}

Make it compelling, professional, and highlight key strengths. Keep it concise and impactful.`;

            const completion = await groq.chat.completions.create({
                messages: [
                    { role: "system", content: "You are a professional resume writer." },
                    { role: "user", content: prompt }
                ],
                model: this.model,
                temperature: 0.7,
            });

            const text = completion.choices[0]?.message?.content || '';
            console.log('📥 Received response from Groq API');
            return text;
        } catch (error) {
            console.error('❌ Groq API Error:', error.message);
            throw new Error(`Failed to generate summary: ${error.message}`);
        }
    }

    // Improve job description with action verbs and quantifiable achievements
    async improveJobDescription(description, position, company) {
        try {
            const prompt = `Improve this job description for a ${position} position at ${company}. 
      
Current description: ${description}

Requirements:
- Use strong action verbs
- Make it more impactful and professional
- Add quantifiable achievements where possible (use placeholders like [X%] if specific numbers aren't provided)
- Keep it concise (3-5 bullet points)
- Format as bullet points starting with •

Return only the improved bullet points, nothing else.`;

            const completion = await groq.chat.completions.create({
                messages: [
                    { role: "system", content: "You are an expert HR specialist and resume optimizer." },
                    { role: "user", content: prompt }
                ],
                model: this.model,
            });

            return completion.choices[0]?.message?.content || '';
        } catch (error) {
            console.error('Groq API Error:', error);
            throw new Error('Failed to improve description');
        }
    }

    // Suggest skills based on job position and experience
    async suggestSkills(position, experience, currentSkills = []) {
        try {
            const prompt = `Suggest 8-10 relevant technical skills for a ${position} position with the following experience:

${experience.map(exp => `- ${exp.position} at ${exp.company}`).join('\n')}

Current skills: ${currentSkills.join(', ') || 'None listed'}

Provide skills that are:
- Relevant to the position
- Industry-standard
- Not already in the current skills list
- Mix of technical and tools

Return only a comma-separated list of skills, nothing else.`;

            const completion = await groq.chat.completions.create({
                messages: [
                    { role: "system", content: "You are a technical recruiter." },
                    { role: "user", content: prompt }
                ],
                model: this.model,
            });

            const skillsText = completion.choices[0]?.message?.content || '';
            return skillsText.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
        } catch (error) {
            console.error('Groq API Error:', error);
            throw new Error('Failed to suggest skills');
        }
    }

    // Generate project description
    async generateProjectDescription(projectName, technologies) {
        try {
            const prompt = `Create a professional project description (2-3 sentences) for a project called "${projectName}" using these technologies: ${technologies.join(', ')}.

Make it:
- Professional and technical
- Highlight key features and impact
- Concise and clear

Return only the description, nothing else.`;

            const completion = await groq.chat.completions.create({
                messages: [
                    { role: "system", content: "You are a senior software engineer." },
                    { role: "user", content: prompt }
                ],
                model: this.model,
            });

            return completion.choices[0]?.message?.content || '';
        } catch (error) {
            console.error('Groq API Error:', error);
            throw new Error('Failed to generate project description');
        }
    }

    // Optimize resume content for ATS (Applicant Tracking Systems)
    async optimizeForATS(resumeData, targetJobDescription = '') {
        try {
            const prompt = `Analyze this resume and provide ATS optimization tips:

Position: ${resumeData.experience[0]?.position || 'Professional'}
Skills: ${resumeData.skills?.technical?.join(', ') || 'Not specified'}
${targetJobDescription ? `Target Job: ${targetJobDescription}` : ''}

Provide 5 specific, actionable tips to improve ATS compatibility. Format as numbered list.`;

            const completion = await groq.chat.completions.create({
                messages: [
                    { role: "system", content: "You are an ATS optimization expert." },
                    { role: "user", content: prompt }
                ],
                model: this.model,
            });

            return completion.choices[0]?.message?.content || '';
        } catch (error) {
            console.error('Groq API Error:', error);
            throw new Error('Failed to optimize for ATS');
        }
    }

    // Optimize raw resume content for ATS
    async optimizeForATSContent(resumeText, targetJobDescription = '') {
        try {
            const prompt = `Analyze this resume content and provide ATS optimization tips:

Resume Content:
${resumeText.substring(0, 5000)}... (truncated if too long)

${targetJobDescription ? `Target Job: ${targetJobDescription}` : ''}

Provide 5 specific, actionable tips to improve ATS compatibility. Format as numbered list.`;

            const completion = await groq.chat.completions.create({
                messages: [
                    { role: "system", content: "You are an ATS optimization expert." },
                    { role: "user", content: prompt }
                ],
                model: this.model,
            });

            return completion.choices[0]?.message?.content || '';
        } catch (error) {
            console.error('Groq API Error:', error);
            throw new Error('Failed to optimize for ATS content');
        }
    }

    // Generic AI assistance for resume improvement
    async getResumeAdvice(section, content) {
        try {
            const prompt = `Provide professional advice for improving this ${section} section of a resume:

${content}

Give 3 specific, actionable suggestions. Be concise and professional.`;

            const completion = await groq.chat.completions.create({
                messages: [
                    { role: "system", content: "You are a professional career coach." },
                    { role: "user", content: prompt }
                ],
                model: this.model,
            });

            return completion.choices[0]?.message?.content || '';
        } catch (error) {
            console.error('Groq API Error:', error);
            throw new Error('Failed to get resume advice');
        }
    }

    // Calculate ATS Score
    async calculateATSScore(resumeData, jobDescription) {
        try {
            console.log('📊 Calculating ATS score for job description...');

            const prompt = `Analyze this resume against the job description and provide a compatibility score.

Resume:
${JSON.stringify(resumeData, null, 2)}

Job Description:
${jobDescription}

Return a valid JSON object with this EXACT structure:
{
  "score": <number between 0-100>,
  "missingKeywords": ["<keyword1>", "<keyword2>", ...],
  "formattingIssues": ["<issue1>", "<issue2>", ...],
  "helpfulTips": ["<tip1>", "<tip2>", ...]
}

Do not include any markdown formatting or explanation, just the raw JSON object.`;

            const completion = await groq.chat.completions.create({
                messages: [
                    { role: "system", content: "You are an expert ATS (Applicant Tracking System) algorithm." },
                    { role: "user", content: prompt }
                ],
                model: this.model,
                temperature: 0.3, // Lower temperature for more consistent JSON
                response_format: { type: "json_object" }
            });

            const response = completion.choices[0]?.message?.content;
            return JSON.parse(response);
        } catch (error) {
            console.error('❌ Groq ATS Score Error:', error.message);
            throw new Error('Failed to calculate ATS score');
        }
    }
}

export default new GroqService();
