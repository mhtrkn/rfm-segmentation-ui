export interface RFMRecord {
  id: number;
  recency: number;
  frequency: number;
  monetary: number;
}

export type RFMScore = 1 | 2 | 3 | 4 | 5;

export interface ScoredRFMRecord extends RFMRecord {
  frequencyScore: RFMScore; // x-axis
  monetaryScore: RFMScore;  // y-axis
}

export interface GridPosition {
  x: RFMScore;
  y: RFMScore;
}

export interface GridCell {
  position: GridPosition;
  items: ScoredRFMRecord[];
}
