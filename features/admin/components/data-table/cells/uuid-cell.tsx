import React, { useState } from "react";

export const UUIDCell = ({ uuid }: { uuid: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(uuid)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch((err) => console.error("Błąd kopiowania:", err));
  };

  return (
    <div className="relative inline-block">
      <span
        className="cursor-pointer hover:underline"
        title="Copy full ID"
        onClick={handleCopy}
      >
        {uuid.slice(0, 8)}
      </span>
      {copied && (
        <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 animate-fade-in-out pointer-events-none">
          Copied!
        </span>
      )}
      <style>{`
        @keyframes fade-in-out {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-fade-in-out {
          animation: fade-in-out 1.5s forwards;
        }
      `}</style>
    </div>
  );
};
