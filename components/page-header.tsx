import { Badge } from "@/components/ui/badge";

export function PageHeader({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
      <div>
        {eyebrow ? (
          <Badge tone="ai" className="mb-3">
            {eyebrow}
          </Badge>
        ) : null}
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">{title}</h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground lg:text-base">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}
