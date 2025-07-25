export type TiptapNode = {
  type: string;
  text?: string;
  content?: TiptapNode[];
};

export const IGNORED_TYPES = new Set([
  "codeBlock",
  "bulletList",
  "orderedList",
  "listItem",
  "blockquote",
  "table",
  "tableRow",
  "tableCell",
]);
