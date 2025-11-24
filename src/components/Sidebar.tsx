import { useState } from 'react';
import { FileText, MessageSquare, ChevronDown, ChevronRight, Plus, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Document {
  id: string;
  name: string;
  type: 'PDF' | 'DOCX' | 'TXT' | 'XLSX';
  size: string;
  date: string;
  description: string;
}

interface Chat {
  id: string;
  title: string;
  timestamp: string;
  preview: string;
}

interface SidebarProps {
  documents: Document[];
  chats: Chat[];
  selectedDocumentId: string | null;
  selectedChatId: string | null;
  onSelectDocument: (id: string) => void;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
}

const getFileIcon = (type: string) => {
  switch (type) {
    case 'XLSX':
      return <FileSpreadsheet className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const getBadgeVariant = (type: string) => {
  switch (type) {
    case 'PDF':
      return 'destructive';
    case 'DOCX':
      return 'default';
    case 'XLSX':
      return 'secondary';
    default:
      return 'outline';
  }
};

export function Sidebar({
  documents,
  chats,
  selectedDocumentId,
  selectedChatId,
  onSelectDocument,
  onSelectChat,
  onNewChat,
}: SidebarProps) {
  const [documentsExpanded, setDocumentsExpanded] = useState(true);
  const [chatsExpanded, setChatsExpanded] = useState(true);

  return (
    <div className="w-80 h-screen flex flex-col glass border-r">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-3xl">📄</div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-gradient-start to-primary-gradient-end bg-clip-text text-transparent">
            Docling
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">Chat with your knowledge.</p>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <Button
          onClick={onNewChat}
          className="w-full gradient-primary text-white hover:opacity-90 transition-opacity shadow-medium"
          size="lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Chat
        </Button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {/* My Documents */}
        <div>
          <button
            onClick={() => setDocumentsExpanded(!documentsExpanded)}
            className="flex items-center justify-between w-full py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            <span>My Documents</span>
            {documentsExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {documentsExpanded && (
            <div className="space-y-2 mt-2">
              {documents.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => onSelectDocument(doc.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all hover:shadow-soft ${
                    selectedDocumentId === doc.id
                      ? 'bg-primary/10 border border-primary/20'
                      : 'bg-card hover:bg-accent/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-muted-foreground">
                      {getFileIcon(doc.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm truncate">{doc.name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getBadgeVariant(doc.type)} className="text-xs">
                          {doc.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{doc.size}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Chat History */}
        <div>
          <button
            onClick={() => setChatsExpanded(!chatsExpanded)}
            className="flex items-center justify-between w-full py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            <span>Chat History</span>
            {chatsExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {chatsExpanded && (
            <div className="space-y-2 mt-2">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => onSelectChat(chat.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all hover:shadow-soft ${
                    selectedChatId === chat.id
                      ? 'bg-primary/10 border border-primary/20'
                      : 'bg-card hover:bg-accent/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-4 w-4 mt-1 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate mb-1">{chat.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{chat.preview}</p>
                      <p className="text-xs text-muted-foreground mt-1">{chat.timestamp}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">john.doe@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
