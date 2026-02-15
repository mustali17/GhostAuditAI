import PDFDocument from 'pdfkit';
import { IAuditResult } from '../models/AuditResult';

export const generateTrustReport = (audit: IAuditResult, res: any) => {
  const doc = new PDFDocument({ margin: 50 });

  // Pipe to response
  doc.pipe(res);

  // --- Header ---
  doc.fontSize(20).text('GHOSTAUDIT AI', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text('TRUST REPORT', { align: 'center' });
  doc.moveDown(2);

  // --- File Info ---
  doc.fontSize(14).text(`File Name: ${audit.fileName}`);
  doc.fontSize(10).text(`Audit ID: ${audit._id}`);
  doc.text(`Date: ${new Date(audit.createdAt).toLocaleDateString()}`);
  doc.moveDown(2);

  // --- Scores ---
  doc.fontSize(16).text('Risk Assessment');
  doc.moveDown(0.5);

  // Draw some simple bars or just text
  doc.fontSize(12).text(`AI Probability Score: ${audit.aiScore}%`);
  if (audit.aiScore > 50) {
      doc.fillColor('red').text('Status: HIGH RISK');
  } else {
      doc.fillColor('green').text('Status: LOW RISK');
  }
  doc.fillColor('black'); // Reset
  
  doc.moveDown();
  doc.text(`Plagiarism Score: ${audit.plagiarismScore}%`);
  
  doc.moveDown(2);

  // --- Flagged Issues ---
  doc.fontSize(16).text('Flagged Issues');
  doc.moveDown(0.5);

  if (audit.flaggedSentences.length === 0) {
      doc.fontSize(12).text('No issues found. This document appears to be human-written.');
  } else {
      audit.flaggedSentences.forEach((issue, index) => {
          doc.fontSize(12).font('Helvetica-Bold').text(`${index + 1}. ${issue.issueType}`);
          doc.fontSize(10).font('Helvetica').text(`"${issue.text}"`);
          if (issue.suggestion) {
              doc.fontSize(10).font('Helvetica-Oblique').text(`Suggestion: ${issue.suggestion}`);
          }
          doc.moveDown();
      });
  }

  // --- Footer / Certificate ---
  doc.moveDown(4);
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);
  doc.fontSize(10).text('Certified by GhostAudit AI Triple-Threat Engine', { align: 'center' });
  doc.text('www.ghostaudit.ai', { align: 'center' });

  doc.end();
};
