import { google } from 'googleapis';
import { Readable } from 'stream';

export const downloadFile = async (
  fileId: string,
  accessToken: string,
  refreshToken?: string
): Promise<Buffer> => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  
  oauth2Client.setCredentials({ 
      access_token: accessToken,
      refresh_token: refreshToken 
  });

  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  try {
    const response = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' }
    );

    return new Promise((resolve, reject) => {
      const chunks: any[] = [];
      const stream = response.data as Readable;

      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', (err) => reject(err));
    });
  } catch (error) {
    console.error('Error downloading file:', error);
    throw new Error('Failed to download file from Google Drive');
  }
};

export const getFileMetadata = async (
    fileId: string, 
    accessToken: string,
    refreshToken?: string
) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  
  oauth2Client.setCredentials({ 
      access_token: accessToken,
      refresh_token: refreshToken 
  });

  const drive = google.drive({ version: 'v3', auth: oauth2Client });
  const response = await drive.files.get({
    fileId,
    fields: 'id, name, mimeType',
  });
  return response.data;
};
