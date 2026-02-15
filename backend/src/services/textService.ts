import mammoth from 'mammoth';
import { PDFParse } from 'pdf-parse';

export const extractText = async (
  buffer: Buffer,
  mimeType: string
): Promise<string> => {
  if (
    mimeType ===
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;

  } else if (mimeType === 'application/pdf') {

    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    return result.text;

  } else {
    throw new Error('Unsupported file type');
  }
};
