import { Mail, MapPin } from "lucide-react";
import { GithubIcon, XIcon, InstagramIcon } from "@/components/Icons";
import site from "@/data/site.json";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between">
        <p className="font-mono text-xs text-muted">
          &copy; {new Date().getFullYear()} {site.name}
        </p>

        <div className="flex items-center gap-4 text-muted">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
            aria-label="GitHub"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={site.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
            aria-label="Twitter"
          >
            <XIcon size={16} />
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
            aria-label="Instagram"
          >
            <InstagramIcon size={16} />
          </a>
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-accent"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
          <span className="flex items-center gap-1 text-xs">
            <MapPin size={12} />
            {site.location}
          </span>
        </div>
      </div>
    </footer>
  );
}
