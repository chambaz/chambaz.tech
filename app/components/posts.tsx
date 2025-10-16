import Link from "next/link";
import { formatDate, getBlogPosts } from "app/writing/utils";

type BlogPostProps = {
  title?: boolean;
};

export function BlogPosts({ title = true }: BlogPostProps) {
  let allBlogs = getBlogPosts();

  return (
    <div className="space-y-2 mt-8">
      {title && <h2 className="text-xl font-medium tracking-tight">Writing</h2>}
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-zinc-400 tracking-tight hover:text-white transition-colors">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}
