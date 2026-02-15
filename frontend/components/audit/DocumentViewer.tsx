import { useState } from 'react';
import HumanizerModal from './HumanizerModal';

interface DocumentViewerProps {
  text: string;
  flaggedSentences: { text: string; issueType: string }[];
}

export default function DocumentViewer({ text, flaggedSentences }: DocumentViewerProps) {
  const [selectedSentence, setSelectedSentence] = useState<string | null>(null);
  
  // Naive highlighting approach: split text by flagged sentences.
  // Real-world: needs robust offset-based highlighting.
  // For MVP: We will simply iterate and replace valid occurrences with marked spans.
  
  // NOTE: This approach is fragile if sentences repeat. 
  // Improvement: Backend provides offsets. Since we use `match` logic in mock audit, we don't have offsets.
  // let's create a render function that highlights found text strings.
  
  const renderText = () => {
     let parts: { text: string; isFlagged: boolean; issue?: string }[] = [{ text, isFlagged: false }];
     
     flaggedSentences.forEach((flag) => {
         const newParts: typeof parts = [];
         parts.forEach(part => {
             if (part.isFlagged) {
                 newParts.push(part);
                 return;
             }
             
             // Split current part by the flagged text
             const split = part.text.split(flag.text);
             for (let i = 0; i < split.length; i++) {
                 newParts.push({ text: split[i], isFlagged: false });
                 if (i < split.length - 1) {
                     newParts.push({ text: flag.text, isFlagged: true, issue: flag.issueType });
                 }
             }
         });
         parts = newParts;
     });
     
     return parts.map((part, i) => {
         if (part.isFlagged) {
             return (
                 <span 
                    key={i} 
                    className="bg-red-500/20 text-red-200 cursor-pointer hover:bg-red-500/40 border-b border-red-500/50"
                    onClick={() => setSelectedSentence(part.text)}
                 >
                     {part.text}
                 </span>
             );
         }
         return <span key={i}>{part.text}</span>;
     });
  };

  return (
    <div className="flex-1 bg-muted/30 p-8 font-mono text-sm leading-relaxed text-foreground overflow-y-auto whitespace-pre-wrap border-r border-border">
      {renderText()}
      
      {selectedSentence && (
        <HumanizerModal 
            sentence={selectedSentence} 
            isOpen={!!selectedSentence} 
            onClose={() => setSelectedSentence(null)}
            onApply={(newText) => {
                alert("For this MVP, applying text is a visual simulation. In production, this updates the document state.");
                setSelectedSentence(null);
            }} 
        />
      )}
    </div>
  );
}
