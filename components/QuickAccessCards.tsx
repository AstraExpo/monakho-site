import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface QuickAccessCardProps {
  icon: LucideIcon;
  iconGradient: string;
  title: string;
  description: string;
  linkHref: string;
  linkText: string;
  linkColor: string;
}

export function QuickAccessCard({
  icon: Icon,
  iconGradient,
  title,
  description,
  linkHref,
  linkText,
  linkColor,
}: QuickAccessCardProps) {
  return (
    <div className="group bg-[hsl(var(--card)/0.1)] backdrop-blur-md rounded-2xl p-6 border border-[hsl(var(--border)/0.2)] hover:bg-[hsl(var(--card)/0.2)] transition-all duration-300 hover:scale-105">
      <div
        className={`w-12 h-12 rounded-xl ${iconGradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-6 h-6 text-[hsl(var(--primary-foreground))]" />
      </div>
      <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-2">
        {title}
      </h3>
      <p className="text-[hsl(var(--muted-foreground))] text-sm mb-4">
        {description}
      </p>
      <Link href={linkHref}>
        <Button
          variant="ghost"
          className={`p-0 text-[hsl(var(--${linkColor}-foreground))] hover:text-[hsl(var(--${linkColor}))]`}
        >
          {linkText} →
        </Button>
      </Link>
    </div>
  );
}
