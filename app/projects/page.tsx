import { Projects } from "app/components/projects";

export default function projects() {
  return (
    <div className="flex flex-col justify-start flex-1">
      <div>
        <h1 className="text-6xl mb-8 tracking-tighter">Projects</h1>
        <Projects title={false} />
      </div>
    </div>
  );
}
