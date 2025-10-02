import type { Metadata } from "next";
import { BlogPosts } from "app/components/posts";
import { Projects } from "app/components/projects";

export const metadata: Metadata = {
  title: "Adam Chambers - Product engineer, ux designer, creative technologist",
  description:
    "Exploring the intersection of blockchain, decentralized finance, and ai.",
};

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-7xl tracking-tighter">Adam Chambers</h1>
      <p className="mb-4">
        Product engineer, ux designer, and creative technologist.
        <br className="md:block hidden" /> Exploring the intersection of
        blockchain, decentralized finance, and ai.
      </p>
      <div className="mt-8">
        <BlogPosts />
        <Projects />
      </div>
    </section>
  );
}
