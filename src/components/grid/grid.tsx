import { ScoredRFMRecord } from "@/types/rfm";
import { GridCell } from "./grid-cell";

interface GridProps {
  data: ScoredRFMRecord[];
  selectedIds: number[];
  onCellSelect: (ids: number[]) => void;
  className?: string;
}

export function Grid({
  data,
  selectedIds,
  onCellSelect,
  className = ""
}: GridProps) {
  const yAxis = [5, 4, 3, 2, 1];
  const xAxis = [1, 2, 3, 4, 5];

  return (
    <div className={`grid grid-cols-5 gap-2 ${className}`}>
      {yAxis.map(y =>
        xAxis.map(x => {
          const cellItems = data.filter(
            item =>
              item.frequencyScore === x &&
              item.monetaryScore === y
          );

          const cellIds = cellItems.map(i => i.id);

          const isSelected =
            cellIds.length > 0 &&
            cellIds.every(id => selectedIds.includes(id));

          return (
            <GridCell
              key={`${x}-${y}`}
              x={x}
              y={y}
              items={cellItems}
              isSelected={isSelected}
              onClick={() => onCellSelect(cellIds)}
            />
          );
        })
      )}
    </div>
  );
}
