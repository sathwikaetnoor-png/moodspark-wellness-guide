import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { X, Smile, Frown, Meh, Heart, Zap, Cloud } from "lucide-react";

const moodOptions = [
  { emotion: "happy", label: "Happy", icon: Smile, color: "emotion-happy" },
  { emotion: "calm", label: "Calm", icon: Heart, color: "emotion-calm" },
  { emotion: "neutral", label: "Neutral", icon: Meh, color: "muted" },
  { emotion: "sad", label: "Sad", icon: Frown, color: "emotion-sad" },
  { emotion: "anxious", label: "Anxious", icon: Cloud, color: "emotion-anxious" },
  { emotion: "excited", label: "Excited", icon: Zap, color: "emotion-excited" },
];

interface MoodCheckInProps {
  onClose: () => void;
  onSubmit: (mood: { emotion: string; intensity: number; note: string }) => void;
}

export const MoodCheckIn = ({ onClose, onSubmit }: MoodCheckInProps) => {
  const [selectedMood, setSelectedMood] = useState("");
  const [intensity, setIntensity] = useState([5]);
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (!selectedMood) return;
    
    onSubmit({
      emotion: selectedMood,
      intensity: intensity[0],
      note: note,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md p-6 bg-card/95 backdrop-blur-sm shadow-wellness">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">How are you feeling?</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Mood Selection */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-3">Choose your mood</p>
            <div className="grid grid-cols-3 gap-3">
              {moodOptions.map((mood) => {
                const Icon = mood.icon;
                return (
                  <Button
                    key={mood.emotion}
                    variant={selectedMood === mood.emotion ? "default" : "outline"}
                    className={`h-auto p-3 flex-col space-y-1 ${
                      selectedMood === mood.emotion 
                        ? "bg-primary shadow-soft" 
                        : "hover:bg-primary-soft/20"
                    }`}
                    onClick={() => setSelectedMood(mood.emotion)}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-xs">{mood.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Intensity Slider */}
          {selectedMood && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-3">
                Intensity: {intensity[0]}/10
              </p>
              <Slider
                value={intensity}
                onValueChange={setIntensity}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
          )}

          {/* Optional Note */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Notes (optional)
            </p>
            <Textarea
              placeholder="What's on your mind? Any particular reason for this mood?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="resize-none bg-muted/50"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit}
            disabled={!selectedMood}
            className="w-full bg-gradient-wellness hover:shadow-glow transition-all duration-300"
            size="lg"
          >
            Save Check-in
          </Button>
        </div>
      </Card>
    </div>
  );
};