import { WALL, type Grid } from "../grid";

const FLOOR_RGB = [236, 236, 230] as const;
const WALL_RGB = [52, 52, 60] as const;
const MAX_BOARD_WIDTH = 928;

export class BoardRenderer {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly offscreen = document.createElement("canvas");
  private readonly offCtx: CanvasRenderingContext2D;
  private cellSize = 1;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.ctx = must(canvas.getContext("2d"));
    this.offCtx = must(this.offscreen.getContext("2d"));
  }

  draw(grid: Grid): void {
    const { h, w, cells } = grid;
    this.cellSize = Math.max(1, Math.floor(MAX_BOARD_WIDTH / w));

    this.offscreen.width = w;
    this.offscreen.height = h;
    const image = this.offCtx.createImageData(w, h);
    const data = image.data;
    for (let i = 0; i < cells.length; i++) {
      const rgb = cells[i] === WALL ? WALL_RGB : FLOOR_RGB;
      const p = i * 4;
      data[p] = rgb[0];
      data[p + 1] = rgb[1];
      data[p + 2] = rgb[2];
      data[p + 3] = 255;
    }
    this.offCtx.putImageData(image, 0, 0);

    this.canvas.width = w * this.cellSize;
    this.canvas.height = h * this.cellSize;
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(this.offscreen, 0, 0, this.canvas.width, this.canvas.height);
  }

  cellAt(clientX: number, clientY: number, grid: Grid): number | null {
    const rect = this.canvas.getBoundingClientRect();
    const x = Math.floor((clientX - rect.left) / this.cellSize);
    const y = Math.floor((clientY - rect.top) / this.cellSize);
    if (x < 0 || y < 0 || x >= grid.w || y >= grid.h) return null;
    return y * grid.w + x;
  }
}

function must<T>(value: T | null): T {
  if (value === null) throw new Error("2D context is not available");
  return value;
}
