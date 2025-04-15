import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/flow/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/flow/avatar";
import { Badge } from "@/components/flow/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/flow/card";

type NodeMetadata = {
  id: string;
  label: string;
  type: 'default' | 'success' | 'warning';
  createdAt: string;
  lastModified: string;
  createdBy: {
    name: string;
    avatar: string;
  };
  tags: string[];
  description: string;
  status: 'active' | 'archived' | 'draft';
  priority: 'low' | 'medium' | 'high';
};

type SidePanelProps = {
  isOpen: boolean;
  onClose: () => void;
  node: NodeMetadata | null;
};

export function SidePanel({ isOpen, onClose, node }: SidePanelProps) {
  if (!node) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[500px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={node.createdBy.avatar} />
              <AvatarFallback>{node.createdBy.name[0]}</AvatarFallback>
            </Avatar>
            {node.label}
          </SheetTitle>
          <SheetDescription>
            Node ID: {node.id}
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant={node.status === 'active' ? 'default' : 'secondary'}>
                  {node.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Priority</span>
                <Badge variant={node.priority === 'high' ? 'destructive' : 'secondary'}>
                  {node.priority}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Created</span>
                <span className="text-sm">{node.createdAt}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Modified</span>
                <span className="text-sm">{node.lastModified}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{node.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {node.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
} 