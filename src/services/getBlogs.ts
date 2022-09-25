import { IncomingMessage } from "http";

import { http } from "@/services/httpServices";

export function getBlogs(req: IncomingMessage, query?: string) {
  const header = {
    headers: {
      Cookie: req.headers.cookie || "",
    },
  };
  return http.get(`/posts?${query}`, header);
}
