import Link from "next/link";

export function Projects() {
  return (
    <div className="space-y-2 mt-8">
      <h2 className="text-xl font-medium tracking-tight">Projects</h2>
      <Link
        className="flex flex-col space-y-1"
        href="https://www.0.xyz"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="w-full flex flex-col md:flex-row md:space-x-2">
          <p className="text-neutral-600 dark:text-neutral-300 tabular-nums">
            Project 0
          </p>
          <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
            The first defi native prime broker
          </p>
        </div>
      </Link>
      <Link
        className="flex flex-col space-y-1"
        href="https://www.0.xyz"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="w-full flex flex-col md:flex-row md:space-x-2">
          <p className="text-neutral-600 dark:text-neutral-300 tabular-nums">
            Solana UI
          </p>
          <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
            UI components and utilities, built for Solana
          </p>
        </div>
      </Link>
    </div>
  );
}
