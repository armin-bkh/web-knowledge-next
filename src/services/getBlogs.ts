import { http } from "@/services/httpServices";

export function getBlogs(query?: string) {
  return http.get(`/posts?${query}`);
}
