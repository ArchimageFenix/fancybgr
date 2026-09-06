import ThemeToggle from "@/components/theme/ThemeToggle";

export default function Header() {
  return (
    <header
      className="
        border-b border-black/5
        bg-white/90
        backdrop-blur-md
        transition-colors
        dark:border-white/5
        dark:bg-[#0c0d0f]/90
      "
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a
          href="/"
          className="
            font-[var(--font-display)]
            text-xl font-semibold tracking-tight
            text-neutral-950
            transition-colors
            dark:text-white
          "
        >
          FancyBGR
        </a>

        <div className="flex items-center gap-6">
          <nav
            className="
              hidden items-center gap-8
              text-sm text-neutral-600
              md:flex
              dark:text-neutral-400
            "
          >
            <a
              href="#how-it-works"
              className="
                transition-colors
                hover:text-neutral-950
                dark:hover:text-white
              "
            >
              How it works
            </a>

            <a
              href="#features"
              className="
                transition-colors
                hover:text-neutral-950
                dark:hover:text-white
              "
            >
              Features
            </a>

            <a
              href="#faq"
              className="
                transition-colors
                hover:text-neutral-950
                dark:hover:text-white
              "
            >
              FAQ
            </a>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}