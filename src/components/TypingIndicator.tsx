import { Bot } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <Avatar className="bg-accent">
        <AvatarFallback className="text-accent-foreground">
          <Bot className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 max-w-2xl">
        <div className="rounded-2xl p-4 bg-card border shadow-soft mr-12">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
