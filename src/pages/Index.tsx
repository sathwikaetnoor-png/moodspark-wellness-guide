import { useState, useEffect } from "react";
import { Header } from "@/components/wellness/Header";
import { MoodCheckIn } from "@/components/wellness/MoodCheckIn";
import { MoodTrends } from "@/components/wellness/MoodTrends";
import { WellnessRecommendations } from "@/components/wellness/WellnessRecommendations";
import { DashboardStats } from "@/components/wellness/DashboardStats";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Index = () => {
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [moodEntries, setMoodEntries] = useState([]);
  const [dailyStreak, setDailyStreak] = useState(7);

  // Check if user has checked in today
  const hasCheckedInToday = () => {
    const today = new Date().toDateString();
    return moodEntries.some(entry => new Date(entry.date).toDateString() === today);
  };

  const handleMoodEntry = (mood) => {
    const newEntry = {
      id: Date.now(),
      mood: mood.emotion,
      intensity: mood.intensity,
      note: mood.note,
      date: new Date().toISOString(),
    };
    setMoodEntries(prev => [newEntry, ...prev]);
    setShowCheckIn(false);
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      <Header />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Daily Check-in CTA */}
        {!hasCheckedInToday() && (
          <div className="bg-gradient-wellness p-6 rounded-2xl shadow-wellness text-primary-foreground">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">How are you feeling today?</h2>
                <p className="opacity-90">Take a moment to check in with yourself</p>
              </div>
              <Button 
                onClick={() => setShowCheckIn(true)}
                size="lg"
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 border-white/30"
              >
                <Plus className="w-5 h-5 mr-2" />
                Check In
              </Button>
            </div>
          </div>
        )}

        {/* Dashboard Stats */}
        <DashboardStats 
          streak={dailyStreak}
          totalEntries={moodEntries.length}
          weeklyAverage={4.2}
        />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <MoodTrends entries={moodEntries} />
          </div>
          
          <div className="space-y-6">
            <WellnessRecommendations moodEntries={moodEntries} />
          </div>
        </div>
      </main>

      {/* Mood Check-in Modal */}
      {showCheckIn && (
        <MoodCheckIn 
          onClose={() => setShowCheckIn(false)}
          onSubmit={handleMoodEntry}
        />
      )}
    </div>
  );
};

export default Index;