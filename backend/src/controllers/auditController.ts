import { Request, Response } from 'express';
import AuditResult from '../models/AuditResult';
import { getFileMetadata, downloadFile } from '../services/fileService';
import { extractText } from '../services/textService';
import User from '../models/User';

export const getAudit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?._id;

  try {
    const audit = await AuditResult.findOne({ _id: id, userId });

    if (!audit) {
      return res.status(404).json({ message: 'Audit not found' });
    }

    // If text isn't stored in DB (we only stored stats), we might need to re-fetch/extract it 
    // OR we should have stored it. 
    // For MVP, if we didn't store the full text in AuditResult, let's fetch it from Drive again 
    // effectively "on-demand" if not present.
    // Ideally, AuditResult should store the `extractedText`. Let's assume we need to fetch it if missing.
    
    // Check if we have the text. If not, fetch it.
    // For this implementation, let's fetch it on the fly to avoid bloating DB for now, 
    // BUT fetching from Drive every time is slow.
    // LET'S UPDATE THE WORKER TO STORE TEXT? 
    // PROPOSAL: Re-fetch from Drive for now to keep it simple.
    
    let text = '';
    // We need user tokens to fetch from Drive
    const user = await User.findById(userId);
    if (user && user.googleAccessToken) {
         try {
            const buffer = await downloadFile(audit.fileId, user.googleAccessToken, user.googleRefreshToken);
            const metadata = await getFileMetadata(audit.fileId, user.googleAccessToken, user.googleRefreshToken);
            text = await extractText(buffer, metadata.mimeType || '');
         } catch (e) {
             console.error("Failed to fetch text from drive", e);
             text = "Error: Could not retrieve document text from Google Drive.";
         }
    }

    res.json({ ...audit.toObject(), originalText: text });
  } catch (error: any) {
    console.error('Error fetching audit:', error);
    res.status(500).json({ message: 'Failed to fetch audit' });
  }
};

export const humanizeText = async (req: Request, res: Response) => {
  const { sentence } = req.body;

  // MOCK LLM RESPONSE
  const variations = [
    `Reworded: ${sentence.replace(/delve|tapestry/gi, 'examine')}`,
    `Human-like: ${sentence.split(' ').reverse().join(' ')} (Just kidding, this would be a real rewrite)`,
    `Simplified: This is a simpler way to say the same thing.`,
  ];
  
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  res.json({ suggestions: variations });
};

import { generateTrustReport } from '../services/pdfService';

export const generateReport = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?._id;

  try {
    const audit = await AuditResult.findOne({ _id: id, userId });

    if (!audit) {
      return res.status(404).json({ message: 'Audit not found' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Report-${audit.fileName}.pdf`);

    generateTrustReport(audit, res);
  } catch (error: any) {
    console.error('Error generating report:', error);
    res.status(500).json({ message: 'Failed to generate report' });
  }
};
