import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

class PDFParserService {
    // Extract text from PDF buffer
    async extractText(buffer) {
        try {
            const data = await pdfParse(buffer);
            return data.text;
        } catch (error) {
            console.error('PDF Parse Error:', error);
            throw new Error('Failed to parse PDF file');
        }
    }
}

export default new PDFParserService();
