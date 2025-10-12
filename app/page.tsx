import type { Metadata } from "next";
import { BlogPosts } from "app/components/posts";
import { Projects } from "app/components/projects";
import { Model } from "app/components/model";

export const metadata: Metadata = {
  title: "Adam Chambers - Product engineer, ux designer, creative technologist",
  description:
    "Exploring the intersection of blockchain, decentralized finance, and ai.",
};

export default function Page() {
  return (
    <div className="flex flex-col justify-center flex-1 -mt-28">
      <section>
        <h1 className="mb-2 text-7xl tracking-tighter">Adam Chambers</h1>
        <p className="text-zinc-400 leading-loose">
          Product engineer, ux designer, and creative technologist.
          <br className="md:block hidden" /> Exploring the intersection of
          blockchain, defi, and ai.
        </p>
        <div className="mt-12 space-y-10">
          <BlogPosts />
          <Projects />
        </div>
        <Model />
      </section>
    </div>
  );
}
