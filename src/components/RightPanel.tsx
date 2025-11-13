import { FileText, Calendar, HardDrive, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Document {
  id: string;
  name: string;
  type: 'PDF' | 'DOCX' | 'TXT' | 'XLSX';
  size: string;
  date: string;
  description: string;
}

interface RightPanelProps {
  document: Document | null;
}

export function RightPanel({ document }: RightPanelProps) {
  if (!document) {
    return (
      <div className="w-96 h-screen glass border-l flex items-center justify-center p-8">
        <div className="text-center">
          <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No Document Selected</h3>
          <p className="text-sm text-muted-foreground">
            Select a document from the left panel to view its details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-96 h-screen glass border-l overflow-y-auto">
      <div className="p-6">
        <div className="mb-6">
          <Badge className="gradient-primary text-white mb-3 shadow-soft">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Processed
          </Badge>
          <h2 className="text-2xl font-bold mb-2">{document.name}</h2>
          <p className="text-sm text-muted-foreground">{document.description}</p>
        </div>

        <div className="space-y-4">
          {/* Document Type */}
          <div className="bg-card rounded-xl p-4 shadow-soft border hover:shadow-medium transition-all">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold">Document Type</span>
            </div>
            <Badge variant="outline" className="mt-1">
              {document.type}
            </Badge>
          </div>

          {/* File Size */}
          <div className="bg-card rounded-xl p-4 shadow-soft border hover:shadow-medium transition-all">
            <div className="flex items-center gap-3 mb-2">
              <HardDrive className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold">File Size</span>
            </div>
            <p className="text-sm text-muted-foreground">{document.size}</p>
          </div>

          {/* Upload Date */}
          <div className="bg-card rounded-xl p-4 shadow-soft border hover:shadow-medium transition-all">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold">Upload Date</span>
            </div>
            <p className="text-sm text-muted-foreground">{document.date}</p>
          </div>

          {/* Processing Info */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-4 border border-primary/10">
            <h4 className="text-sm font-semibold mb-2">Processing Status</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This document has been successfully processed and indexed. You can now ask questions about its content, request summaries, or extract specific information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
