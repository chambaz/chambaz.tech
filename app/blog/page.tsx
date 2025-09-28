import { BlogPosts } from "app/components/posts";

export const metadata = {
  title: "Thoughts and ideas",
};

export default function Page() {
  return (
    <section>
      <h1 className="text-5xl mb-8 tracking-tighter">Thoughts and ideas</h1>
      <BlogPosts />
    </section>
  );
}
