import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp, Calendar } from "lucide-react";

interface MoodEntry {
  id: number;
  mood: string;
  intensity: number;
  date: string;
}

interface MoodTrendsProps {
  entries: MoodEntry[];
}

export const MoodTrends = ({ entries }: MoodTrendsProps) => {
  // Generate sample data if no entries exist
  const sampleData = [
    { date: "Mon", mood: 7, day: "Monday" },
    { date: "Tue", mood: 6, day: "Tuesday" },
    { date: "Wed", mood: 8, day: "Wednesday" },
    { date: "Thu", mood: 5, day: "Thursday" },
    { date: "Fri", mood: 7, day: "Friday" },
    { date: "Sat", mood: 9, day: "Saturday" },
    { date: "Sun", mood: 8, day: "Sunday" },
  ];

  // Transform real entries into chart data (use sample if no entries)
  const chartData = entries.length > 0 
    ? entries.slice(0, 7).reverse().map((entry, index) => ({
        date: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' }),
        mood: entry.intensity,
        day: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long' })
      }))
    : sampleData;

  const averageMood = chartData.reduce((sum, item) => sum + item.mood, 0) / chartData.length;
  const trend = chartData.length > 1 
    ? chartData[chartData.length - 1].mood - chartData[0].mood 
    : 0;

  return (
    <Card className="p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Mood Trends
          </h3>
          <p className="text-sm text-muted-foreground">Past 7 days</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{averageMood.toFixed(1)}</p>
          <p className="text-sm text-muted-foreground">Average</p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              className="text-xs text-muted-foreground"
            />
            <YAxis 
              domain={[1, 10]}
              axisLine={false}
              tickLine={false}
              className="text-xs text-muted-foreground"
            />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-card border border-border rounded-lg p-3 shadow-soft">
                      <p className="font-medium">{payload[0].payload.day}</p>
                      <p className="text-primary">
                        Mood: <span className="font-bold">{payload[0].value}/10</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line 
              type="monotone" 
              dataKey="mood" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {entries.length > 0 ? `${entries.length} entries` : "Sample data"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {trend > 0 ? (
            <TrendingUp className="w-4 h-4 text-success" />
          ) : trend < 0 ? (
            <TrendingUp className="w-4 h-4 text-destructive rotate-180" />
          ) : (
            <div className="w-4 h-4" />
          )}
          <span className={`text-sm font-medium ${
            trend > 0 ? "text-success" : trend < 0 ? "text-destructive" : "text-muted-foreground"
          }`}>
            {trend > 0 ? `+${trend.toFixed(1)}` : trend < 0 ? trend.toFixed(1) : "Stable"}
          </span>
        </div>
      </div>
    </Card>
  );
};