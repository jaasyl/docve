import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ChatArea, type Message } from '@/components/ChatArea';
import { RightPanel } from '@/components/RightPanel';

const mockDocuments = [
  {
    id: '1',
    name: 'Annual Report 2024.pdf',
    type: 'PDF' as const,
    size: '2.4 MB',
    date: 'Jan 15, 2025',
    description: 'Company financial report and performance summary for fiscal year 2024.',
  },
  {
    id: '2',
    name: 'Project Proposal.docx',
    type: 'DOCX' as const,
    size: '845 KB',
    date: 'Jan 10, 2025',
    description: 'Detailed project proposal including timeline, budget, and deliverables.',
  },
  {
    id: '3',
    name: 'Meeting Notes.txt',
    type: 'TXT' as const,
    size: '12 KB',
    date: 'Jan 8, 2025',
    description: 'Notes from quarterly planning meeting with stakeholders.',
  },
  {
    id: '4',
    name: 'Budget Forecast.xlsx',
    type: 'XLSX' as const,
    size: '1.1 MB',
    date: 'Jan 5, 2025',
    description: 'Financial projections and budget allocation for Q1 2025.',
  },
];

const mockChats = [
  {
    id: 'c1',
    title: 'Budget Analysis Discussion',
    timestamp: '2 hours ago',
    preview: 'Can you summarize the Q1 budget forecast?',
  },
  {
    id: 'c2',
    title: 'Annual Report Questions',
    timestamp: 'Yesterday',
    preview: 'What were the key performance indicators?',
  },
  {
    id: 'c3',
    title: 'Project Timeline Review',
    timestamp: '3 days ago',
    preview: 'How long is the estimated project duration?',
  },
];

const Index = () => {
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const selectedDocument = mockDocuments.find((doc) => doc.id === selectedDocumentId);

  const handleSelectDocument = (id: string) => {
    setSelectedDocumentId(id);
    setSelectedChatId(null);
    const doc = mockDocuments.find((d) => d.id === id);
    
    // Load simulated chat for this document
    setMessages([
      {
        id: 'm1',
        role: 'assistant',
        content: `Hello! I've analyzed "${doc?.name}". Feel free to ask me anything about this document.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleSelectChat = (id: string) => {
    setSelectedChatId(id);
    setSelectedDocumentId(null);
    const chat = mockChats.find((c) => c.id === id);
    
    // Load simulated chat history
    setMessages([
      {
        id: 'm1',
        role: 'user',
        content: chat?.preview || 'Previous message',
        timestamp: 'Earlier',
      },
      {
        id: 'm2',
        role: 'assistant',
        content: 'Based on the document, here are the key insights...',
        timestamp: 'Earlier',
      },
    ]);
  };

  const handleNewChat = () => {
    setSelectedDocumentId(null);
    setSelectedChatId(null);
    setMessages([]);
  };

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: `m${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: `m${Date.now() + 1}`,
        role: 'assistant',
        content: getSimulatedResponse(content),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const getSimulatedResponse = (userMessage: string): string => {
    const responses = [
      `That's an interesting question about "${userMessage}". Based on the document analysis, I can provide you with detailed insights.`,
      'Let me break that down for you. The key points from the document suggest several important considerations.',
      'Great question! According to the information in the document, here are the relevant details you should know.',
      'I\'ve searched through the document content. Here\'s what I found that relates to your query.',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="flex h-screen w-full overflow-hidden gradient-subtle">
      <Sidebar
        documents={mockDocuments}
        chats={mockChats}
        selectedDocumentId={selectedDocumentId}
        selectedChatId={selectedChatId}
        onSelectDocument={handleSelectDocument}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
      />
      <ChatArea
        messages={messages}
        documentName={selectedDocument?.name}
        documentDescription={selectedDocument?.description}
        onSendMessage={handleSendMessage}
        isTyping={isTyping}
      />
      <RightPanel document={selectedDocument || null} />
    </div>
  );
};

export default Index;
