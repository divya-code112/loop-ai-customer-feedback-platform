import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const members = [
  ["Ms.Divya Lawand", "admin@loop.demo", "ADMIN"],
  ["Mr.Kshitij Jagtap", "analyst@loop.demo", "ANALYST"],
  ["Divya", "viewer@loop.demo", "VIEWER"]
];

export default function MembersPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Workspace"
        title="Members and roles"
        description="Admins manage access while RBAC helpers enforce permissions server-side."
      />
      <Card className="divide-y overflow-hidden">
        {members.map(([name, email, role]) => (
          <div key={email} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
            <Badge tone="ai">{role}</Badge>
          </div>
        ))}
      </Card>
    </div>
  );
}
