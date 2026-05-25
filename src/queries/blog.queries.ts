import BlogService from "@/services/blog.service";
import { BlogQueryParams } from "@/types";

export const blogQueries = {
  all: ["blogs"] as const,
  list: (params: BlogQueryParams) => ({
    queryKey: [...blogQueries.all, "list", params] as const,
    queryFn: () => BlogService.getAll(params),
  }),
  bySlug: (slug: string) => ({
    queryKey: [...blogQueries.all, "post", slug] as const,
    queryFn: () => BlogService.getBySlug(slug),
    enabled: !!slug,
  }),
};
