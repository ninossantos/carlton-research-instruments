import { cn } from "@/lib/utils";
import { recognitionLabels } from "@/lib/data/jurisdictions";
import type { Recognition } from "@/lib/data/types";

const tone: Record<Recognition, string> = {
  "named-civil": "bg-primary-soft text-primary",
  "named-criminal": "bg-surface-2 text-criminal",
  "named-custody": "bg-primary-soft text-primary",
  "named-po": "bg-primary-soft text-primary",
  related: "bg-surface-2 text-related",
  silent: "bg-surface-2 text-silent",
  pending: "bg-surface-2 text-pending",
};

export function StatusChip({ status, className }: { status: Recognition; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-full px-2.5 text-xs font-medium",
        tone[status],
        className,
      )}
    >
      {recognitionLabels[status]}
    </span>
  );
}
