import { http } from "@/services/httpServices";

export function getPostBySlug(hashId: string, slug: string) {
  return http.get(`/posts/${slug}`);
}
