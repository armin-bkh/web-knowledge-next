import { http } from "@/services/httpServices";
import { IncomingMessage } from "http";

export function getPostBySlug(
  req: IncomingMessage,
  hashId: string,
  slug: string
) {
  const header = {
    headers: {
      Cookie: req.headers.cookie || "",
    },
  };
  return http.get(`/posts/${slug}`, header);
}
