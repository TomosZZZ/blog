import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";

interface FormMessageProps {
  message: string;
  type: "error" | "success";
}

export const FormMessage = ({ message, type }: FormMessageProps) => {
  return (
    <div
      className={`w-full border-2 my-2 py-2 px-4 rounded-lg flex items-center gap-2   ${
        type === "error"
          ? "bg-red-400/[.70] border-red-900"
          : "bg-emerald-500/[.70] border-emerald-700 "
      } `}
    >
      {type === "error" ? <FaTimesCircle /> : <FaCheckCircle />}
      <p className="text-sm">{message}</p>
    </div>
  );
};
