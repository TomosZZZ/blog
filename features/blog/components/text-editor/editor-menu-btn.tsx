import React from "react";

interface EditorMenuBtnProps {
  onClick: () => void;
  children: React.ReactNode;
  isActive: boolean;
  title: string;
}

export const EditorMenuBtn = ({
  onClick: clickHandler,
  children,
  isActive,
  title,
}: EditorMenuBtnProps) => {
  return (
    <button
      className={`pointer px-2 py-1 hover:bg-gray-900 rounded-md ${
        isActive ? "bg-gray-800" : ""
      }`}
      title={title}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};
