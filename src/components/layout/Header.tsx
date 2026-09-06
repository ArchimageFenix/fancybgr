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
        fancy:border-cyan-300/10
        fancy:bg-[#07111f]/85
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
            fancy:bg-gradient-to-r
            fancy:from-cyan-300
            fancy:via-blue-400
            fancy:to-violet-400
            fancy:bg-clip-text
            fancy:text-transparent
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
              fancy:text-slate-300
            "
          >
            <a
              href="#how-it-works"
              className="
                transition-colors
                hover:text-neutral-950
                dark:hover:text-white
                fancy:hover:text-cyan-300
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
                fancy:hover:text-cyan-300
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
                fancy:hover:text-cyan-300
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