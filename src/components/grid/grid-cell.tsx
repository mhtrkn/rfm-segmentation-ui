import { ScoredRFMRecord } from "@/types/rfm";

interface GridCellProps {
  x: number;
  y: number;
  items: ScoredRFMRecord[];
  isSelected: boolean;
  onClick: () => void;
}

export function GridCell({
  x,
  y,
  items,
  isSelected,
  onClick,
}: GridCellProps) {
  return (
    <button
      onClick={onClick}
      className={`border border-gray-200 rounded p-2 px-0 text-sm text-center transition cursor-pointer
        ${isSelected ? "bg-blue-100 border-blue-400! text-blue-800" : "hover:bg-blue-50"}
        ${items?.length < 1 && "opacity-25 border-gray-300 pointer-events-none"}
      `}
    >
      <div className="font-mono text-xs sm:text-lg">
        F{x} – M{y}
      </div>

      <div className={`text-xs text-gray-600 ${isSelected && "text-blue-500!"}`}>
        ({items.length} kayıt)
      </div>
    </button>
  );
}
