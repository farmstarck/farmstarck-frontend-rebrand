import api from "@/lib/axios-client";
import { BlogQueryParams } from "@/types";

const BlogService = {
  getAll: (params: BlogQueryParams) =>
    api.get("/api/blogs", { params }).then((r) => r.data.data),
  getBySlug: (slug: string) =>
    api.get(`/api/blogs/${slug}`).then((r) => r.data.data),
};

export default BlogService;
