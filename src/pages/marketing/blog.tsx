"use client";
import Head from "next/head";
import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { blogQueries } from "@/queries/blog.queries";
import { useDebounce } from "@/hooks/useDebounce";
import BlogCard from "@/components/common/Marketing/Blog/BlogCard";
import BlogCardSkeleton from "@/components/common/Marketing/Blog/BlogCardSkeleton";
import LightPagination from "@/components/common/LightPagination";
import { Search, X } from "lucide-react";
import Link from "next/link";

const networkItem = [
  { img: "/assets/svg/comnet1.svg", name: "X Space", link: "#" },
  { img: "/assets/svg/comnet2.svg", name: "LinkedIn", link: "#" },
  { img: "/assets/svg/comnet3.svg", name: "Facebook", link: "#" },
  { img: "/assets/svg/comnet4.svg", name: "Instagram", link: "#" },
  { img: "/assets/svg/comnet5.svg", name: "Youtube", link: "#" },
  { img: "/assets/svg/comnet6.svg", name: "Whatsapp", link: "#" },
];

const Blog = () => {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [_, setLimit] = useState(9);
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedTag]);

  const { data, isLoading } = useQuery(
    blogQueries.list({
      search: debouncedSearch || undefined,
      tag: selectedTag,
      page,
      size: 9,
    }),
  );

  const posts = data?.posts ?? [];
  const pagination = data?.pagination;

  const allTags = useMemo(
    () => [...new Set(posts.flatMap((p: { tags?: string[] }) => p.tags ?? []))] as string[],
    [posts],
  );

  return (
    <>
      <Head>
        <title>
          Farmstarck Blog - Agricultural Trends, News & Publications
        </title>
        <meta
          name="description"
          content="Stay updated with Farmstarck's latest agricultural trends, news, and community insights."
        />
        <link rel="canonical" href="https://farmstarck.com/marketing/blog" />
      </Head>

      <div className="flex flex-col">
        {/* ── Hero ──────────────────────────────────────────── */}
        <div className="bg-lite">
          <div className="w-full max-w-5xl mx-auto px-5 py-16 md:py-24 flex flex-col items-center text-center gap-5">
            <span className="uppercase text-xs md:text-sm text-primary font-bold tracking-widest bg-primary/10 px-4 py-1.5 rounded-full">
              Our Blog
            </span>
            <h1 className="text-3xl md:text-5xl text-dark-green font-extrabold leading-tight max-w-2xl">
              Stay up-to-date with{" "}
              <span className="text-primary">Agricultural Trends</span>
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-lg leading-relaxed">
              Insights, tips and news from Nigeria&apos;s leading agricultural
              marketplace — straight from our team of farming experts.
            </p>

            {/* Search */}
            <div className="relative w-full max-w-lg mt-2">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-11 pr-10 py-3.5 border-2 border-gray-200 focus:border-primary rounded-2xl text-sm outline-none transition-colors bg-white shadow-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Posts Section ─────────────────────────────────── */}
        <div className="bg-white">
          <div className="w-full max-w-6xl mx-auto px-5 py-12 flex flex-col gap-8">
            {/* Active tag filter indicator */}
            {selectedTag && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Filtered by tag:</span>
                <button
                  onClick={() => setSelectedTag(undefined)}
                  className="flex items-center gap-1.5 text-sm font-semibold bg-primary text-white px-3 py-1 rounded-full hover:bg-primary/90 transition-colors"
                >
                  {selectedTag}
                  <X size={12} />
                </button>
              </div>
            )}

            {/* Posts grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <BlogCardSkeleton key={i} />
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="flex flex-col items-center py-20 gap-4">
                <img
                  src="/assets/images/marketplaces/notfound.png"
                  alt="No posts"
                  className="w-36 h-36 object-contain opacity-50"
                />
                <p className="font-bold text-gray-700 text-xl">
                  No articles found
                </p>
                <p className="text-sm text-gray-400 text-center max-w-xs">
                  {search
                    ? `No results for "${search}". Try a different keyword.`
                    : "No blog posts published yet. Check back soon!"}
                </p>
                {(search || selectedTag) && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setSelectedTag(undefined);
                    }}
                    className="mt-2 text-sm text-primary font-semibold border border-primary px-4 py-2 rounded-xl hover:bg-primary/5 transition-colors"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post: { id: string; slug: string; title: string; tags?: string[]; headerImage?: string; createdAt: string; content: unknown }) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    onTagClick={setSelectedTag}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <LightPagination
                page={page}
                pages={pagination.totalPages}
                setPage={setPage}
                setLimit={setLimit}
              />
            )}
          </div>
        </div>

        {/* ── Community Network ─────────────────────────────── */}
        <div className="bg-lite">
          <div className="w-full max-w-6xl mx-auto px-5 py-16 flex flex-col items-center gap-10">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-dark-green">
                Our Community Network{" "}
                <span className="text-primary">Our First Network</span>
              </h2>
              <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
                Join thousands of farmers, merchants and agribusiness owners in
                our growing community.
              </p>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 w-full">
              {networkItem.map((item, i) => (
                <a
                  href={item.link}
                  target="_blank"
                  key={i}
                  className="flex flex-col gap-2 bg-white justify-center items-center py-6 rounded-2xl hover:shadow-md transition-shadow"
                >
                  <img src={item.img} alt={item.name} className="w-7 h-7" />
                  <p className="text-center text-xs font-medium text-gray-600">
                    {item.name}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ── Excerpt helper ─────────────────────────────────────────────────
export const extractExcerpt = (content: { blocks?: { type: string; data: Record<string, unknown> }[] } | unknown, maxLength = 120): string => {
  const c = content as { blocks?: { type: string; data: Record<string, unknown> }[] };
  if (!c?.blocks) return "";
  const text = c.blocks
    .filter((b) => b.type === "paragraph")
    .map((b) => ((b.data.text as string) ?? "").replace(/<[^>]+>/g, ""))
    .join(" ");
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default Blog;
