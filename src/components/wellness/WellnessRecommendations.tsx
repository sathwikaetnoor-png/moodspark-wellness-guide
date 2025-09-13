import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Heart, Brain, Activity, Moon, Coffee } from "lucide-react";

interface MoodEntry {
  id: number;
  mood: string;
  intensity: number;
  date: string;
}

interface WellnessRecommendationsProps {
  moodEntries: MoodEntry[];
}

export const WellnessRecommendations = ({ moodEntries }: WellnessRecommendationsProps) => {
  // Analyze recent mood patterns to generate recommendations
  const getRecommendations = () => {
    const recentEntries = moodEntries.slice(0, 3);
    const averageIntensity = recentEntries.length > 0 
      ? recentEntries.reduce((sum, entry) => sum + entry.intensity, 0) / recentEntries.length
      : 6;

    const recommendations = [
      {
        id: 1,
        title: "Morning Meditation",
        description: "Start your day with 10 minutes of mindfulness",
        category: "Mindfulness",
        icon: Brain,
        color: "primary",
        duration: "10 min"
      },
      {
        id: 2,
        title: "Gratitude Journaling",
        description: "Write down 3 things you're grateful for today",
        category: "Reflection",
        icon: Heart,
        color: "secondary",
        duration: "5 min"
      },
      {
        id: 3,
        title: "Deep Breathing Exercise",
        description: "Practice 4-7-8 breathing technique for relaxation",
        category: "Wellness",
        icon: Activity,
        color: "accent",
        duration: "5 min"
      },
    ];

    // Add mood-specific recommendations
    if (averageIntensity < 5) {
      recommendations.unshift({
        id: 4,
        title: "Gentle Movement",
        description: "Take a short walk or do light stretching",
        category: "Physical",
        icon: Activity,
        color: "success",
        duration: "15 min"
      });
    }

    if (averageIntensity > 7) {
      recommendations.push({
        id: 5,
        title: "Energy Balance",
        description: "Try a calming herbal tea or light reading",
        category: "Relaxation",
        icon: Coffee,
        color: "warning",
        duration: "20 min"
      });
    }

    return recommendations.slice(0, 4);
  };

  const recommendations = getRecommendations();

  return (
    <Card className="p-6 shadow-soft">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Personalized Recommendations</h3>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => {
          const Icon = rec.icon;
          return (
            <div 
              key={rec.id}
              className="p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-colors bg-gradient-to-r from-card to-card-soft hover:shadow-soft"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${rec.color}/10`}>
                  <Icon className={`w-5 h-5 text-${rec.color}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-medium text-foreground">{rec.title}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {rec.duration}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {rec.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {rec.category}
                    </Badge>
                    <Button size="sm" variant="ghost" className="text-xs hover:bg-primary/10">
                      Try Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-calm rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <Moon className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Evening Reflection</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Before bed, take a moment to reflect on your day and set intentions for tomorrow.
        </p>
      </div>
    </Card>
  );
};