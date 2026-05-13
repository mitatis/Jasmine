import { CheckCircle2, CircleDashed } from "lucide-react";

export function GenerationTimeline({ steps }: { steps: string[] }) {
  return (
    <ol className="grid gap-2">
      {steps.map((step, index) => (
        <li key={`${step}-${index}`} className="flex items-center gap-3 rounded-md border bg-white px-3 py-2 text-sm">
          {index === steps.length - 1 ? <CircleDashed className="size-4 text-muted-foreground" /> : <CheckCircle2 className="size-4" />}
          <span>{step}</span>
        </li>
      ))}
    </ol>
  );
}
