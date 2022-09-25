import { http } from "@/services/httpServices";

export function likePost(postId: string) {
  return http.put(`/posts/like/${postId}`);
}

export function bookmarkPost(postId: string) {
  return http.put(`/posts/bookmark/${postId}`);
}
