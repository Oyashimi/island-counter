import { createRandomGrid, type Grid } from "./grid";
import { BoardRenderer } from "./render/canvas";

const form = byId<HTMLFormElement>("controls");
const heightInput = byId<HTMLInputElement>("height");
const widthInput = byId<HTMLInputElement>("width");
const wallRatioInput = byId<HTMLInputElement>("wall-ratio");
const status = byId<HTMLParagraphElement>("status");
const renderer = new BoardRenderer(byId<HTMLCanvasElement>("board"));

let grid: Grid;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  regenerate();
});

regenerate();

function regenerate(): void {
  const h = clampInt(heightInput.valueAsNumber, 1, 2000);
  const w = clampInt(widthInput.valueAsNumber, 1, 2000);
  const ratio = Math.min(1, Math.max(0, wallRatioInput.valueAsNumber || 0));
  grid = createRandomGrid(h, w, ratio);
  renderer.draw(grid);
  status.textContent = `${h} × ${w} = ${(h * w).toLocaleString()} マス`;
}

function clampInt(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, Math.floor(value)));
}

function byId<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`#${id} not found`);
  return el as T;
}
