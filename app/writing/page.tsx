import { BlogPosts } from "app/components/posts";

export const metadata = {
  title: "Writing - Adam Chambers",
};

export default function Page() {
  return (
    <div className="flex flex-col justify-start flex-1">
      <div>
        <h1 className="text-5xl md:text-6xl mb-8 tracking-tighter">
          Thoughts and ideas
        </h1>
        <BlogPosts title={false} />
      </div>
    </div>
  );
}
