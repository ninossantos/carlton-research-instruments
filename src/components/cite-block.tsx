import { citeInstrument } from "@/lib/cite";
import { useState } from "react";
import { cn } from "@/lib/utils";

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Preview iframes often block the Clipboard API. Fall back to a selected field.
  }
  try {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.top = "0";
    field.style.left = "0";
    field.style.width = "2em";
    field.style.height = "2em";
    field.style.padding = "0";
    field.style.border = "none";
    field.style.outline = "none";
    field.style.boxShadow = "none";
    field.style.background = "transparent";
    document.body.appendChild(field);
    field.focus();
    field.select();
    field.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(field);
    return ok;
  } catch {
    return false;
  }
}

export function CiteBlock({
  title,
  path,
  lastReviewed,
  className,
}: {
  title: string;
  path: string;
  lastReviewed: string;
  className?: string;
}) {
  const text = citeInstrument(title, path, lastReviewed);
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  return (
    <figure className={cn("border-t border-border pt-5", className)}>
      <figcaption className="text-xs uppercase tracking-[0.14em] text-faint">How to cite</figcaption>
      <p className="mt-2 font-display text-base leading-snug text-fg">{text}</p>
      <button
        type="button"
        className="mt-3 text-sm text-primary hover:underline"
        onClick={async () => {
          const ok = await copyText(text);
          setStatus(ok ? "copied" : "failed");
          window.setTimeout(() => setStatus("idle"), 1800);
        }}
      >
        {status === "copied" ? "Copied" : status === "failed" ? "Copy failed" : "Copy citation"}
      </button>
    </figure>
  );
}
