import type { Grid } from "../grid";

export type Result = {
  maxSize: number;
  region: Uint32Array;
  visitOrder?: Uint32Array;
  peakMemory: number;
  error?: string;
};

export type Algorithm = (grid: Grid, recordVisitOrder: boolean) => Result;
