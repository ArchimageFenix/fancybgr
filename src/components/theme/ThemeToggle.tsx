"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "fancy";

const THEME_STORAGE_KEY = "fancybgr-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    if (root.classList.contains("fancy")) {
      setTheme("fancy");
    } else if (root.classList.contains("dark")) {
      setTheme("dark");
    } else {
      setTheme("light");
    }

    setMounted(true);
  }, []);

  function applyTheme(nextTheme: Theme) {
    const root = document.documentElement;

    root.classList.toggle(
      "dark",
      nextTheme === "dark" || nextTheme === "fancy",
    );

    root.classList.toggle("fancy", nextTheme === "fancy");

    root.style.colorScheme =
      nextTheme === "light" ? "light" : "dark";

    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);

    setTheme(nextTheme);
  }

  function toggleTheme() {
    const nextTheme: Theme =
      theme === "light"
        ? "dark"
        : theme === "dark"
          ? "fancy"
          : "light";

    applyTheme(nextTheme);
  }

  function getNextThemeLabel() {
    if (theme === "light") {
      return "Switch to dark theme";
    }

    if (theme === "dark") {
      return "Switch to Fancy theme";
    }

    return "Switch to light theme";
  }

  if (!mounted) {
    return <div className="h-9 w-9" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={getNextThemeLabel()}
      title={getNextThemeLabel()}
      className="
        flex h-9 w-9 items-center justify-center
        rounded-full
        border border-black/10
        bg-black/[0.03]
        text-neutral-700
        transition
        hover:bg-black/[0.07]
        hover:text-neutral-950
        dark:border-white/10
        dark:bg-white/[0.06]
        dark:text-neutral-300
        dark:hover:bg-white/[0.12]
        dark:hover:text-white
        fancy-theme-button
      "
    >
      {theme === "light" && <MoonIcon />}

      {theme === "dark" && <SparklesIcon />}

      {theme === "fancy" && <SunIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 3-1.2 3.3A4.1 4.1 0 0 1 8.3 8.8L5 10l3.3 1.2a4.1 4.1 0 0 1 2.5 2.5L12 17l1.2-3.3a4.1 4.1 0 0 1 2.5-2.5L19 10l-3.3-1.2a4.1 4.1 0 0 1-2.5-2.5L12 3Z" />
      <path d="m19 16-.5 1.4a2.5 2.5 0 0 1-1.1 1.1L16 19l1.4.5a2.5 2.5 0 0 1 1.1 1.1L19 22l.5-1.4a2.5 2.5 0 0 1 1.1-1.1L22 19l-1.4-.5a2.5 2.5 0 0 1-1.1-1.1L19 16Z" />
    </svg>
  );
}