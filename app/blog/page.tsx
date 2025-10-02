import { BlogPosts } from "app/components/posts";

export const metadata = {
  title: "Writing - Adam Chambers",
};

export default function Page() {
  return (
    <section>
      <h1 className="text-6xl mb-8 tracking-tighter">Thoughts and ideas</h1>
      <BlogPosts />
    </section>
  );
}
