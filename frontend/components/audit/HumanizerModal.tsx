"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Sparkles } from "lucide-react";

interface HumanizerModalProps {
  sentence: string;
  isOpen: boolean;
  onClose: () => void;
  onApply: (newText: string) => void;
}

export default function HumanizerModal({
  sentence,
  isOpen,
  onClose,
  onApply,
}: HumanizerModalProps) {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>("");

  const generateSuggestions = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/audit/humanize`,
        { sentence },
        { withCredentials: true },
      );
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error("Failed to humanize", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Humanize Sentence</DialogTitle>
          <DialogDescription>
            Use AI to rewrite this sentence and remove robotic patterns.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-zinc-400">Original</h4>
            <div className="rounded-md bg-red-950/30 p-3 text-sm text-red-200 border border-red-900/50">
              {sentence}
            </div>
          </div>

          {suggestions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-zinc-400">Suggestions</h4>
              <div className="space-y-2">
                {suggestions.map((suggestion, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedSuggestion(suggestion)}
                    className={`p-3 rounded-md cursor-pointer border text-sm ${selectedSuggestion === suggestion ? "bg-green-950/30 border-green-500 text-green-200" : "bg-zinc-900 border-zinc-800 hover:bg-zinc-800"}`}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!suggestions.length && (
            <div className="flex justify-center py-4">
              <Button
                onClick={generateSuggestions}
                disabled={loading}
                className="bg-white text-black hover:bg-zinc-200"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                {loading ? "Generating..." : "Generate Suggestions"}
              </Button>
            </div>
          )}
        </div>

        <DialogFooter>
          {suggestions.length > 0 && (
            <Button
              onClick={() => onApply(selectedSuggestion)}
              disabled={!selectedSuggestion}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Apply Changes
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
