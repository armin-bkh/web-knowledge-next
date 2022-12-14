import { http } from "@/services/httpServices";

export type TPostCommentBody = {
  postId: string;
  content: string;
  responseTo?: string | null;
};

export function postComment(comment: TPostCommentBody) {
  return http.post("/post-comment/save-comment", comment);
}
