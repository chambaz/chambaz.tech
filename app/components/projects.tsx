import Link from "next/link";

type ProjectProps = {
  title?: boolean;
};

export function Projects({ title = true }: ProjectProps) {
  return (
    <div className="space-y-4 md:space-y-2">
      {title && (
        <h2 className="text-xl font-medium tracking-tight">Projects</h2>
      )}
      <Link
        className="flex flex-col space-y-1"
        href="https://www.0.xyz"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="w-full flex flex-col md:flex-row md:space-x-2">
          <p className="text-zinc-400 tracking-tight hover:text-white transition-colors">
            Project 0: The first defi native prime broker
          </p>
        </div>
      </Link>
      <Link
        className="flex flex-col space-y-1"
        href="https://www.solanaui.dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="w-full flex flex-col md:flex-row md:space-x-2">
          <p className="text-zinc-400 tracking-tight hover:text-white transition-colors">
            Solana UI: UI components and utilities, built for Solana
          </p>
        </div>
      </Link>
    </div>
  );
}
