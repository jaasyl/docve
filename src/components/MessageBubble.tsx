import { Bot, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Message } from './ChatArea';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <Avatar className={isUser ? 'bg-primary' : 'bg-accent'}>
        <AvatarFallback className={isUser ? 'text-primary-foreground' : 'text-accent-foreground'}>
          {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
        </AvatarFallback>
      </Avatar>
      
      <div className={`flex-1 max-w-2xl ${isUser ? 'flex justify-end' : ''}`}>
        <div
          className={`rounded-2xl p-4 shadow-soft ${
            isUser
              ? 'gradient-primary text-white ml-12'
              : 'bg-card border mr-12'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          <span className={`text-xs mt-2 block ${isUser ? 'text-white/70' : 'text-muted-foreground'}`}>
            {message.timestamp}
          </span>
        </div>
      </div>
    </div>
  );
}
