import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { blogQueries } from "@/queries/blog.queries";
import { ChevronLeft, Calendar, Eye, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import BlogContent from "@/components/common/Marketing/Blog/BlogContent";
import BlogCard from "@/components/common/Marketing/Blog/BlogCard";
import MarketingLayout from "@/layouts/MainLayout";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: { blocks: { type: string; data: Record<string, unknown> }[] };
  tags: string[];
  headerImage?: string | null;
  published: boolean;
  publishedAt?: string | null;
  createdAt: string;
  viewCount?: number;
  author?: { id: string; fullName: string };
}

const extractText = (content: BlogPost["content"]): string => {
  if (!content?.blocks) return "";
  return content.blocks
    .filter((b) => b.type === "paragraph")
    .map((b) => (b.data.text as string).replace(/<[^>]+>/g, ""))
    .join(" ");
};

const getReadTime = (content: BlogPost["content"]): number => {
  const words = extractText(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

const SingleBlogPost = ({ post: serverPost }: { post?: BlogPost | null }) => {
  const router = useRouter();
  const { slug } = router.query;

  const { data: post, isLoading } = useQuery({
    ...blogQueries.bySlug(slug as string),
    select: (res: BlogPost) => res,
    enabled: !!slug && router.isReady,
    initialData: serverPost ?? undefined,
  });

  const firstTag = post?.tags?.[0];
  const { data: relatedData } = useQuery({
    ...blogQueries.list({ tag: firstTag, size: 4 }),
    enabled: !!firstTag,
    select: (res: { posts?: BlogPost[] }) =>
      res.posts?.filter((p) => p.slug !== slug).slice(0, 3),
  });

  const relatedPosts = relatedData ?? [];
  const readTime = post ? getReadTime(post.content) : 0;
  const excerpt = post ? extractText(post.content).slice(0, 160) : "";

  if (isLoading || !router.isReady) {
    return (
      <div className="min-h-screen bg-lite">
        <div className="max-w-3xl mx-auto px-4 py-12 space-y-6 animate-pulse">
          <div className="h-4 w-20 bg-gray-200 rounded-full" />
          <div className="h-10 w-4/5 bg-gray-200 rounded-xl" />
          <div className="h-4 w-48 bg-gray-200 rounded" />
          <div className="aspect-video w-full bg-gray-200 rounded-2xl" />
          <div className="space-y-3 pt-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-4 bg-gray-200 rounded"
                style={{ width: `${95 - i * 5}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-lite flex items-center justify-center">
        <div className="text-center p-8 max-w-sm">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📄</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Post Not Found
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            This article may have been removed or the link is incorrect.
          </p>
          <Link
            href="/marketing/blog"
            className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} — Farmstarck Blog</title>
        <meta name="description" content={excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={excerpt} />
        <meta
          property="og:image"
          content={post.headerImage ?? "/assets/images/blog-hero.png"}
        />
        <meta property="og:type" content="article" />
        {post.tags?.map((tag: string) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      </Head>

      <div className="min-h-screen bg-lite">
        {/* ── Top nav bar ───────────────────────────────────── */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link
              href="/marketing/blog"
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary font-medium transition-colors"
            >
              <ChevronLeft size={16} />
              Back to Blog
            </Link>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: post.title,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary font-medium border border-gray-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Share2 size={13} />
              Share
            </button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ── Tags ─────────────────────────────────────────── */}
          {post.tags?.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mb-5">
              {post.tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/marketing/blog?tag=${tag}`}
                  className="text-xs font-semibold bg-litegreen text-primary px-3 py-1 rounded-full capitalize hover:bg-primary hover:text-white transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* ── Title ────────────────────────────────────────── */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
            {post.title}
          </h1>

          {/* ── Meta row ─────────────────────────────────────── */}
          <div className="flex items-center gap-3 flex-wrap text-xs text-gray-400 mb-8 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-bold text-[10px]">
                  {post.author?.fullName?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="font-semibold text-gray-700">
                {post.author?.fullName ?? "Farmstarck"}
              </span>
            </div>
            <span className="text-gray-200">·</span>
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString(
                "en-GB",
                { day: "2-digit", month: "long", year: "numeric" },
              )}
            </div>
            <span className="text-gray-200">·</span>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              {readTime} min read
            </div>
            {(post.viewCount ?? 0) > 0 && (
              <>
                <span className="text-gray-200">·</span>
                <div className="flex items-center gap-1">
                  <Eye size={12} />
                  {(post.viewCount ?? 0).toLocaleString()} views
                </div>
              </>
            )}
          </div>

          {/* ── Header image ─────────────────────────────────── */}
          {post.headerImage && (
            <div className="w-full rounded-2xl overflow-hidden mb-10 shadow-sm">
              <img
                src={post.headerImage}
                alt={post.title}
                className="w-full aspect-video object-cover"
              />
            </div>
          )}

          {/* ── Content ──────────────────────────────────────── */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm mb-12">
            <BlogContent content={post.content} />
          </div>

          {/* ── Author card ───────────────────────────────────── */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-12 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-primary font-extrabold text-xl">
                {post.author?.fullName?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                Written by
              </p>
              <p className="font-bold text-gray-900">
                {post.author?.fullName ?? "Farmstarck"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Farmstarck Editorial Team
              </p>
            </div>
          </div>

          {/* ── Related posts ─────────────────────────────────── */}
          {relatedPosts.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-gray-200" />
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                  Related Articles
                </h2>
                <div className="h-px flex-1 bg-gray-200" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPosts.map((related: BlogPost) => (
                  <BlogCard key={related.id} post={{ ...related, headerImage: related.headerImage ?? undefined, publishedAt: related.publishedAt ?? undefined }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context: { params: { slug: string } }) => {
  const { slug } = context.params;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`,
    );
    if (!res.ok) return { props: { post: null } }; // ← don't return notFound, let component handle it
    const data = await res.json();
    // Backend returns { message, data: post } or just the post
    const post = data?.data ?? data;
    return { props: { post } };
  } catch {
    return { props: { post: null } }; // ← same here
  }
};

SingleBlogPost.getLayout = (page: React.ReactNode) => (
  <MarketingLayout>{page}</MarketingLayout>
);

export default SingleBlogPost;
