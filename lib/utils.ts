import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IGNORED_TYPES, TiptapNode } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractTextFromTipTapJSON = (node: TiptapNode): string => {
  if (!node || IGNORED_TYPES.has(node.type)) return "";

  let text = "";
  if (node.type === "text" && node.text) {
    text += node.text;
  }

  if (Array.isArray(node.content)) {
    for (const child of node.content) {
      text += extractTextFromTipTapJSON(child) + " ";
    }
  }

  return text.trim();
};
