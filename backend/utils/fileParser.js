import mammoth from 'mammoth';

/**
 * Extract text from PDF buffer
 */
export const extractTextFromPDF = async (buffer) => {
    try {
        console.log('📄 Attempting to extract text from PDF...');
        console.log('Buffer size:', buffer.length, 'bytes');

        // Dynamic import for pdf-parse (CommonJS module)
        const pdfParseModule = await import('pdf-parse');
        const pdfParse = pdfParseModule.default || pdfParseModule;
        const data = await pdfParse(buffer);

        console.log('✅ PDF parsed successfully');
        console.log('Number of pages:', data.numpages);
        console.log('Text length:', data.text?.length || 0, 'characters');

        if (!data.text || data.text.trim().length === 0) {
            throw new Error('PDF appears to be empty or image-based (no extractable text found). Please use a text-based PDF.');
        }

        return data.text;
    } catch (error) {
        console.error('❌ PDF extraction error:', error.message);
        if (error.message.includes('image-based')) {
            throw error; // Re-throw our custom error
        }
        throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
};

/**
 * Extract text from DOCX buffer
 */
export const extractTextFromDOCX = async (buffer) => {
    try {
        console.log('📄 Attempting to extract text from DOCX...');
        console.log('Buffer size:', buffer.length, 'bytes');

        const result = await mammoth.extractRawText({ buffer });

        console.log('✅ DOCX parsed successfully');
        console.log('Text length:', result.value?.length || 0, 'characters');

        if (!result.value || result.value.trim().length === 0) {
            throw new Error('DOCX appears to be empty or corrupted (no extractable text found).');
        }

        return result.value;
    } catch (error) {
        console.error('❌ DOCX extraction error:', error.message);
        throw new Error(`Failed to extract text from DOCX: ${error.message}`);
    }
};

/**
 * Extract text from file based on mimetype
 */
export const extractTextFromFile = async (file) => {
    if (!file || !file.buffer) {
        throw new Error('No file provided');
    }

    const { mimetype, buffer } = file;

    if (mimetype === 'application/pdf') {
        return await extractTextFromPDF(buffer);
    } else if (
        mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        mimetype === 'application/msword'
    ) {
        return await extractTextFromDOCX(buffer);
    } else {
        throw new Error('Unsupported file type');
    }
};
