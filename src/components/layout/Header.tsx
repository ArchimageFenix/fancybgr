export default function Header() {
  return (
    <header className="border-b border-black/5 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a
          href="/"
          className="text-xl font-semibold tracking-tight text-neutral-950"
        >
          FancyBGR
        </a>

        <nav className="hidden items-center gap-8 text-sm text-neutral-600 md:flex">
          <a href="#how-it-works" className="transition hover:text-neutral-950">
            How it works
          </a>

          <a href="#features" className="transition hover:text-neutral-950">
            Features
          </a>

          <a href="#faq" className="transition hover:text-neutral-950">
            FAQ
          </a>
        </nav>
      </div>
    </header>
  );
}