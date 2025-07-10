import { ErrorCardProps } from "@/types";
import { AlertCircle } from "lucide-react";

const ErrorCard: React.FC<ErrorCardProps> = ({ message, onRetry }) => (
  <div className="bg-slate-800/50 border border-red-500/50 rounded-2xl p-6 text-center text-red-400 flex flex-col items-center justify-center gap-4">
    <AlertCircle className="h-10 w-10 text-red-500" />
    <p className="text-sm">{message}</p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
      Retry
    </button>
  </div>
);

export default ErrorCard;
