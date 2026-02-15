interface AuditResult {
  aiScore: number;
  plagiarismScore: number;
  flaggedSentences: {
    text: string;
    issueType: 'AI' | 'PLAGIARISM' | 'FACT_CHECK';
    suggestion?: string;
  }[];
}

export const analyzeText = async (text: string): Promise<AuditResult> => {
  // MOCK LOGIC FOR MVP
  // If text contains "AI", give it a high score.
  // We simulate processing time.
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [];
  const flaggedSentences: AuditResult['flaggedSentences'] = [];
  let aiScore = 15; // Base score

  sentences.forEach((sentence) => {
    const s = sentence.trim();
    if (s.toLowerCase().includes('delve') || s.toLowerCase().includes('tapestry')) {
      flaggedSentences.push({
        text: s,
        issueType: 'AI',
        suggestion: 'Consider rewriting to sounds more natural.',
      });
      aiScore += 20;
    }
    if (s.length > 30 && Math.random() > 0.8) {
       // Randomly flag long sentences
       flaggedSentences.push({
        text: s,
        issueType: 'FACT_CHECK',
        suggestion: 'Verify this claim.',
      });
    }
  });

  return {
    aiScore: Math.min(aiScore, 100),
    plagiarismScore: Math.floor(Math.random() * 10), // Random low value
    flaggedSentences,
  };
};
