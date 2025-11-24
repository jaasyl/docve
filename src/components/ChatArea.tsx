import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatAreaProps {
  messages: Message[];
  documentName?: string;
  documentDescription?: string;
  onSendMessage: (message: string) => void;
  isTyping: boolean;
}

export function ChatArea({
  messages,
  documentName,
  documentDescription,
  onSendMessage,
  isTyping,
}: ChatAreaProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className="glass border-b p-6">
        {documentName ? (
          <>
            <h2 className="text-2xl font-bold mb-1">{documentName}</h2>
            {documentDescription && (
              <p className="text-sm text-muted-foreground">{documentDescription}</p>
            )}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-1">New Chat</h2>
            <p className="text-sm text-muted-foreground">
              Start a conversation or select a document
            </p>
          </>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">Ready to chat</h3>
              <p className="text-muted-foreground">
                Ask questions about your documents or start a conversation about anything.
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="glass border-t p-6">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-xl shadow-soft hover:shadow-medium transition-all"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your document..."
            className="flex-1 rounded-xl shadow-soft border-border/50 focus:border-primary transition-all"
          />
          <Button
            type="submit"
            disabled={!input.trim()}
            className="gradient-primary text-white rounded-xl shadow-medium hover:shadow-strong transition-all disabled:opacity-50"
            size="icon"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Press Enter to send • AI responses are simulated
        </p>
      </div>
    </div>
  );
}
