export const FLOOR = 0;
export const WALL = 1;

export type Grid = {
  h: number;
  w: number;
  cells: Uint8Array;
};

export function createRandomGrid(h: number, w: number, wallRatio: number): Grid {
  const cells = new Uint8Array(h * w);
  for (let i = 0; i < cells.length; i++) {
    cells[i] = Math.random() < wallRatio ? WALL : FLOOR;
  }
  return { h, w, cells };
}

export function toText(grid: Grid): string {
  const lines: string[] = [];
  for (let y = 0; y < grid.h; y++) {
    let line = "";
    for (let x = 0; x < grid.w; x++) {
      line += grid.cells[y * grid.w + x] === WALL ? "#" : ".";
    }
    lines.push(line);
  }
  return lines.join("\n");
}
