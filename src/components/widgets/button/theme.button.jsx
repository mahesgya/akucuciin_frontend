import React, { useEffect, useRef, useState } from "react";
import useTheme from "../../../hooks/use.theme";

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const SystemIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const themeOptions = [
  { name: "light", label: "Light", icon: <SunIcon /> },
  { name: "dark", label: "Dark", icon: <MoonIcon /> },
  { name: "system", label: "System", icon: <SystemIcon /> },
];

function Caret({ open }) {
  return (
    <svg className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
    </svg>
  );
}

export default function ThemeSwitcher() {
  const { theme, changeTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const current = themeOptions.find(o => o.name === theme) || themeOptions[0];

  return (
    <div className="relative" ref={wrapRef}>
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-haspopup="true"
          aria-expanded={open}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 dark:border-neutral-700
                     bg-white/60 dark:bg-dark-card/50 text-gray-700 dark:text-dark-text
                     shadow-sm hover:bg-gray-50 dark:hover:bg-dark-card-darker
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                     ring-offset-2 ring-offset-white dark:ring-offset-dark-bg"
        >
          <span className="shrink-0">{current.icon}</span>
          <Caret open={open} />
        </button>

        {open && (
          <div
            role="menu"
            className="absolute left-0 mt-2 z-50 origin-top-left rounded-xl border border-gray-200 dark:border-neutral-700
                       bg-white dark:bg-dark-card shadow-lg p-1 animate-[fadeIn_120ms_ease-out]"
            style={{ transformOrigin: "top left" }}
          >
            {themeOptions.map(opt => {
              const active = theme === opt.name;
              return (
                <button
                  key={opt.name}
                  role="menuitem"
                  onClick={() => {
                    changeTheme(opt.name);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                              transition-colors text-gray-700 dark:text-dark-text
                              hover:bg-gray-100 bg-white dark:bg-dark-card dark:hover:bg-gray-700
                              ${active ? "bg-gray-100 dark:bg-gray-800 font-semibold" : ""}`}
                >
                  <span className="shrink-0">{opt.icon}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="hidden md:flex items-center gap-1 p-1 rounded-full border border-gray-200 dark:border-neutral-700 bg-gray-100 dark:bg-dark-card">
        {themeOptions.map(opt => {
          const isActive = theme === opt.name;
          return (
            <button
              key={opt.name}
              onClick={() => changeTheme(opt.name)}
              aria-label={`Switch to ${opt.name} mode`}
              className={[
                "px-2.5 py-1.5 rounded-full inline-flex items-center gap-1.5 text-sm",
                "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                "ring-offset-2 ring-offset-white dark:bg-dark-card dark:hover:bg-gray-700 dark:ring-offset-dark-bg",
                isActive
                  ? "bg-blue-primary text-white shadow-sm"
                  : "text-gray-700 dark:text-dark-text/80 hover:bg-white dark:hover:bg-dark-card-darker"
              ].join(" ")}
            >
              <span className="shrink-0">{opt.icon}</span>
              <span className="hidden lg:inline">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
