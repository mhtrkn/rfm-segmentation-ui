import {
  RFMRecord,
  ScoredRFMRecord,
  RFMScore,
  GridCell
} from "@/types/rfm";

const SCORES: RFMScore[] = [1, 2, 3, 4, 5];

function calculateScores(values: number[]): RFMScore[] {
  const sorted = [...values].sort((a, b) => a - b);
  const total = sorted.length;

  return values.map((value) => {
    const index = sorted.indexOf(value);
    const percentile = (index + 1) / total;

    if (percentile <= 0.2) return 1;
    if (percentile <= 0.4) return 2;
    if (percentile <= 0.6) return 3;
    if (percentile <= 0.8) return 4;
    return 5;
  });
}

export function scoreRFMRecords(
  records: RFMRecord[]
): ScoredRFMRecord[] {
  const frequencyValues = records.map((r) => r.frequency);
  const monetaryValues = records.map((r) => r.monetary);

  const frequencyScores = calculateScores(frequencyValues);
  const monetaryScores = calculateScores(monetaryValues);

  return records.map((record, index) => ({
    ...record,
    frequencyScore: frequencyScores[index],
    monetaryScore: monetaryScores[index],
  }));
}

export function buildRFMGrid(
  records: ScoredRFMRecord[]
): GridCell[] {
  const grid: GridCell[] = [];

  for (const x of SCORES) {
    for (const y of SCORES) {
      grid.push({
        position: { x, y },
        items: records.filter(
          (r) => r.frequencyScore === x && r.monetaryScore === y
        ),
      });
    }
  }

  return grid;
}

