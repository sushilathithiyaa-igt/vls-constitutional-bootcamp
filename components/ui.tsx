import Image from "next/image";
import type { ReactNode } from "react";

export const btnPrimary =
  "inline-flex min-h-12 items-center justify-center gap-2 bg-vls px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-vls-dark active:scale-[0.98] motion-reduce:active:scale-100";
export const btnSecondary =
  "inline-flex min-h-12 items-center justify-center gap-2 border border-ink/30 px-6 py-3 text-[15px] font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-ivory active:scale-[0.98] motion-reduce:active:scale-100";

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.18em] ${light ? "text-gold" : "text-vls"}`}
    >
      {children}
    </p>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

/** Academy photograph from lib/content.ts `photos`, rendered locally through next/image. */
export function Photo({
  photo,
  className = "",
  sizes,
  priority = false,
  position = "center",
}: {
  photo: { src: string; alt: string };
  className?: string;
  sizes: string;
  priority?: boolean;
  position?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-ink/10 ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={70}
        className="object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M20.5 3.5A11.8 11.8 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.2 1.6 6L0 24l6.3-1.6a11.9 11.9 0 0 0 5.7 1.5h.1c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.5ZM12 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.8 9.8 0 0 1-1.5-5.2C2.2 6.5 6.6 2.1 12 2.1c2.6 0 5.1 1 7 2.9a9.8 9.8 0 0 1 2.9 7c0 5.4-4.4 9.8-9.9 9.8Zm5.4-7.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.4.1-.6l.5-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2.1 3.2 5 4.4.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.5-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3Z" />
    </svg>
  );
}
