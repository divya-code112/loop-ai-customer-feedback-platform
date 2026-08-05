import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Settings"
        title="Workspace settings"
        description="Manage workspace profile, security defaults, and integration readiness."
      />
      <Card className="max-w-2xl p-5">
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Workspace name</span>
            <Input className="mt-2" defaultValue="Acme Cloud" />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Default feedback status</span>
            <Input className="mt-2" defaultValue="NEW" />
          </label>
          <Button>Save settings</Button>
        </div>
      </Card>
    </div>
  );
}
