import { extractExcerpt } from "@/pages/marketing/blog";
import Link from "next/link";

const BlogCard = ({
  post,
  onTagClick,
}: {
  post: any;
  onTagClick?: (tag: string) => void;
}) => {
  const excerpt = extractExcerpt(post.content, 140);
  const firstTag = post.tags?.[0];

  return (
    <Link
      href={`/marketing/blog/${post.slug}`}
      className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300"
    >
      {/* Tag — above image, small pill */}
      {firstTag && (
        <div className="px-4 pt-4">
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
            {firstTag}
          </span>
        </div>
      )}

      {/* Image */}
      <div className="mx-4 mt-3 rounded-xl overflow-hidden aspect-[16/10] bg-gray-100 shrink-0">
        {post.headerImage ? (
          <img
            src={post.headerImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-litegreen flex items-center justify-center">
            <img
              src="/assets/svg/logo-icon.svg"
              alt=""
              className="w-10 opacity-20"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        {/* Title */}
        <h2 className="font-bold text-gray-900 text-base leading-snug line-clamp-3 group-hover:text-primary transition-colors">
          {post.title}
        </h2>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed flex-1">
            {excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100 mt-auto text-sm text-gray-400">
          <span className="font-medium text-gray-500">
            {post.author?.fullName ?? "Farmstarck"}
          </span>
          <span>·</span>
          <span>
            {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              },
            )}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
