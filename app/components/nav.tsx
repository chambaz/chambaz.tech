import Link from "next/link";

const navItems: Record<string, { name: string; external?: boolean }> = {
  "/": {
    name: "home",
  },
  "/blog": {
    name: "writing",
  },
  "https://x.com/chambaz": {
    name: "contact",
    external: true,
  },
};

export function Navbar() {
  return (
    <nav
      className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto md:relative mb-12"
      id="nav"
    >
      <div className="flex flex-row gap-8">
        {Object.entries(navItems).map(([path, { name, external }]) => {
          return (
            <Link
              key={path}
              href={path}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 align-middle flex items-center gap-1 relative py-1"
            >
              {name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
