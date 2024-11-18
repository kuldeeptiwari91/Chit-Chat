import { ThemeToggle } from "@/components/theme-toggle";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="flex h-16 items-center justify-between px-4">
        <p className="text-sm">
          Built by
          <a
            href="https://github.com/ArhamShameem/Chat-App"
            className="font-medium underline"
          >
            {" "}
            @ArhamShameem
          </a>
        </p>
        <ThemeToggle />
      </div>
    </footer>
  );
}
