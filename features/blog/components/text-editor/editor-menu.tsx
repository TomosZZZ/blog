import { BubbleMenu, Editor } from "@tiptap/react";
import React from "react";
import { EditorMenuBtn } from "./editor-menu-btn";
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaCode,
  FaHeading,
  FaItalic,
  FaList,
  FaParagraph,
  FaStrikethrough,
} from "react-icons/fa";

interface EditorMenuProps {
  editor: Editor | null;
}
const EDITOR_MENU_BUTTONS = [
  {
    icon: <FaBold />,
    title: "Bold - Ctrl + B",
    action: (editor: Editor | null) =>
      editor?.chain().focus().toggleBold().run(),
    isActive: (editor: Editor | null) => editor?.isActive("bold") ?? false,
  },
  {
    icon: <FaItalic />,
    title: "Italic - Ctrl + I",
    action: (editor: Editor | null) =>
      editor?.chain().focus().toggleItalic().run(),
    isActive: (editor: Editor | null) => editor?.isActive("italic") ?? false,
  },
  {
    icon: <FaStrikethrough />,
    title: "Strike Through Ctrl + Shift + S",
    action: (editor: Editor | null) =>
      editor?.chain().focus().toggleStrike().run(),
    isActive: (editor: Editor | null) => editor?.isActive("strike") ?? false,
  },
  {
    icon: <FaAlignLeft />,
    title: "Left Align",
    action: (editor: Editor | null) =>
      editor?.chain().focus().setTextAlign("left").run(),
    isActive: (editor: Editor | null) =>
      editor?.isActive("align", { left: true }) ?? false,
  },
  {
    icon: <FaAlignCenter />,
    title: "Center Align",
    action: (editor: Editor | null) =>
      editor?.chain().focus().setTextAlign("center").run(),
    isActive: (editor: Editor | null) =>
      editor?.isActive("align", { center: true }) ?? false,
  },
  {
    icon: <FaAlignRight />,
    title: "Right Align",
    action: (editor: Editor | null) =>
      editor?.chain().focus().setTextAlign("right").run(),
    isActive: (editor: Editor | null) =>
      editor?.isActive("align", { right: true }) ?? false,
  },
  {
    icon: <FaAlignJustify />,
    title: "Justify Align",
    action: (editor: Editor | null) =>
      editor?.chain().focus().setTextAlign("justify").run(),
    isActive: (editor: Editor | null) =>
      editor?.isActive("align", { justify: true }) ?? false,
  },
  {
    icon: <FaHeading />,
    title: "Heading 1 - Ctrl + Alt + 1",
    action: (editor: Editor | null) =>
      editor?.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (editor: Editor | null) =>
      editor?.isActive("heading", { level: 1 }) ?? false,
  },
  {
    icon: <FaParagraph />,
    title: "Paragraph - Ctrl + Alt + 0",
    action: (editor: Editor | null) =>
      editor?.chain().focus().setParagraph().run(),
    isActive: (editor: Editor | null) => editor?.isActive("paragraph") ?? false,
  },
  {
    icon: <FaList />,
    title: "Bullet List - Ctrl + Shift + 8",
    action: (editor: Editor | null) =>
      editor?.chain().focus().toggleBulletList().run(),
    isActive: (editor: Editor | null) =>
      editor?.isActive("bulletList") ?? false,
  },
  {
    icon: <FaCode />,
    title: "Code Block - Ctrl + Alt + C",
    action: (editor: Editor | null) =>
      editor?.chain().focus().toggleCodeBlock().run(),
    isActive: (editor: Editor | null) => editor?.isActive("codeBlock") ?? false,
  },
  {
    icon: <span>-</span>,
    title: "Horizontal Rule",
    action: (editor: Editor | null) =>
      editor?.chain().focus().setHorizontalRule().run(),
    isActive: (editor: Editor | null) => false,
  },
];
export const EditorMenu = ({ editor }: EditorMenuProps) => {
  return (
    <div className="border rounded-md py-1 px-2 flex gap-2 border-gray-700 flex-wrap items-center justify-center">
      {EDITOR_MENU_BUTTONS.map((btn, index) => (
        <EditorMenuBtn
          key={index}
          onClick={() => btn.action(editor)}
          isActive={btn.isActive(editor)}
          title={btn.title}
        >
          {btn.icon}
        </EditorMenuBtn>
      ))}
    </div>
  );
};
