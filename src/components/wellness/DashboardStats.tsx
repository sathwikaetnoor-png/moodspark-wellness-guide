import { Card } from "@/components/ui/card";
import { TrendingUp, Calendar, Star } from "lucide-react";

interface DashboardStatsProps {
  streak: number;
  totalEntries: number;
  weeklyAverage: number;
}

export const DashboardStats = ({ streak, totalEntries, weeklyAverage }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6 bg-gradient-to-br from-primary-soft to-primary/10 border-primary/20 shadow-soft">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">{streak}</p>
            <p className="text-sm text-primary/70">Day Streak</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-secondary-soft to-secondary/10 border-secondary/20 shadow-soft">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
            <Star className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-secondary">{totalEntries}</p>
            <p className="text-sm text-secondary/70">Total Check-ins</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-accent-soft to-accent/10 border-accent/20 shadow-soft">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="text-2xl font-bold text-accent">{weeklyAverage.toFixed(1)}</p>
            <p className="text-sm text-accent/70">Weekly Average</p>
          </div>
        </div>
      </Card>
    </div>
  );
};