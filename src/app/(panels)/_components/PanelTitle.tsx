import { IconArrowLeftFill } from "@/app/_components/icons/icons";
import { Button } from "@/app/_components/ui/button/button";
import Link from "next/link";

interface PanelPageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  link?: string;
  linkTitle?: string;
}

export default function PanelTitle({
  title,
  subtitle,
  className = "",
  link = "#",
  linkTitle = "",
}: PanelPageTitleProps) {
  return (
    <div className={`mb-10 ${className}`}>
      <div className="flex items-center gap-4 border-b border-base-content/50  pb-2">
        {/* Decorative circle with gradient */}
        <div className="w-5 h-5 rounded-full bg-accent shadow-md"></div>

        <h1 className="text-2xl font-extrabold drop-shadow-sm select-none">
          {title}
        </h1>
        {link && linkTitle && (
          <Link href={link} className="flex-grow text-end">
            <Button isLink animatedIcon>
              {linkTitle}

              <IconArrowLeftFill fill="currentColor" />
            </Button>
          </Link>
        )}
      </div>

      {subtitle && (
        <p className="mt-2 text-lg text-base-content/60 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
