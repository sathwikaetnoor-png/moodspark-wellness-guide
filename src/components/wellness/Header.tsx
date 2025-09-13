import { Brain, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-wellness rounded-xl flex items-center justify-center shadow-soft">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">MindfulSpace</h1>
                <p className="text-sm text-muted-foreground">Your wellness companion</p>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <p className="text-muted-foreground">{currentDate}</p>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};