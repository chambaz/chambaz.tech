import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-7xl tracking-tighter">Adam Chambers</h1>
      <p className="mb-4">
        Product engineer, ux designer, and creative technologist. Exploring the
        intersection of blockchain, decentralized finance, and ai.
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
