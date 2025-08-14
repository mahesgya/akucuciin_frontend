import { useMemo } from "react";
import { useSelector } from "react-redux";

const NAV_ITEMS = [
  { key: "home",    label: "Home",   href: "/" },
  { key: "order",   label: "Order",  href: "/order" },
  { key: "profile", label: "Profile",href: "/profile" },
];

function IconHome({ active }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 11.5L12 4l9 7.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 10.5V20h14v-9.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconOrder({ active }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  );
}

function IconProfile({ active }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M4 20c1.8-3.3 5-5 8-5s6.2 1.7 8 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  );
}

function IconLogin() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10 7V5a2 2 0 0 1 2-2h7v18h-7a2 2 0 0 1-2-2v-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 12H3m0 0 3-3m-3 3 3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function pickIcon(key, active) {
  if (key === "home") return <IconHome active={active} />;
  if (key === "order") return <IconOrder active={active} />;
  return <IconProfile active={active} />;
}

function NavButton({ item, active, isLoggedIn }) {
  const base = "flex flex-col items-center justify-center select-none";
  const color = active ? "text-[#5B6CFF]" : "text-gray-700 dark:text-gray-300";
  const weight = active ? "font-semibold" : "font-medium";
  const icon =
    item.key === "profile" && !isLoggedIn ? <IconLogin /> : pickIcon(item.key, active);

  return (
    <a
      href={item.href}
      aria-label={item.label}
      className={`${base} ${color} ${weight} gap-1 rounded-2xl transition-transform active:scale-95`}
    >
      {icon}
      <span className='font-["Montserrat"] text-sm'>{item.label}</span>
    </a>
  );
}

export default function Sidebar({ currentPath }) {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const items = useMemo(() => {
    return NAV_ITEMS.map((it) => {
      if (it.key === "order") {
        return { ...it, href: isLoggedIn ? "/order" : "/login" };
      }
      if (it.key === "profile") {
        return {
          ...it,
          href: isLoggedIn ? "/profile" : "/login",
          label: isLoggedIn ? "Profile" : "Login",
        };
      }
      return it;
    });
  }, [isLoggedIn]);

  const path =
    typeof currentPath === "string"
      ? currentPath
      : typeof window !== "undefined"
      ? window.location.pathname
      : "/";

  const actives = useMemo(() => {
    const map = {};
    for (const it of items) map[it.key] = path === it.href;
    return map;
  }, [path, items]);

  return (
    <>
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-24 border-r border-gray-200 dark:border-neutral-700 bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm z-40">
        <div className="flex flex-col items-center w-full pt-6 gap-8">
          {items.map((it) => (
            <NavButton key={it.key} item={it} active={actives[it.key]} isLoggedIn={isLoggedIn} />
          ))}
        </div>
      </aside>

      <nav
        className="md:hidden fixed bottom-0 inset-x-0 border-t border-gray-200 dark:border-neutral-700 bg-white/95 dark:bg-dark-card/95 backdrop-blur-sm z-50"
        style={{ paddingBottom: "max(0px, var(--safe-bottom))" }}
      >
        <div className="grid grid-cols-3 place-items-center py-2">
          {items.map((it) => (
            <NavButton key={it.key} item={it} active={actives[it.key]} isLoggedIn={isLoggedIn} />
          ))}
        </div>
      </nav>

      <div className="md:pl-24" aria-hidden />
    </>
  );
}
