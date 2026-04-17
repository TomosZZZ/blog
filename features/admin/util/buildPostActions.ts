import { PostStatus } from "@/features/blog/types/post-status";
import { PostAction } from "../types/post-action";

export function buildPostActions({
  role,
  status,
}: {
  role: "ADMIN" | "EDITOR";
  status: PostStatus;
}): PostAction[] {
  if (role === "EDITOR") {
    switch (status) {
      case PostStatus.DRAFT:
        return ["EDIT", "DELETE"];
      case PostStatus.IN_REVIEW:
        return ["VIEW"];
      case PostStatus.CHANGES_REQ:
        return ["EDIT"];
      case PostStatus.APPROVED:
        return ["VIEW", "PUBLISH"];
      case PostStatus.PUBLISHED:
        return ["VIEW"];
    }
  }

  if (role === "ADMIN") {
    switch (status) {
      case PostStatus.DRAFT:
        return ["VIEW", "DELETE"];
      case PostStatus.IN_REVIEW:
        return ["REVIEW"];
      case PostStatus.CHANGES_REQ:
        return ["VIEW"];
      case PostStatus.APPROVED:
        return ["VIEW", "PUBLISH"];
      case PostStatus.PUBLISHED:
        return ["VIEW"];
    }
  }

  return [];
}
