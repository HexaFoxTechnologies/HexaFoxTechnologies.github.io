/** Small helpers for drawing pointy-top hexagons in SVG and placing things around them. */
export interface Point {
  x: number;
  y: number;
}

/** Point at `angle` degrees (0 = straight up, clockwise) and `distance` from the centre. */
export function polar(center: Point, distance: number, angle: number): Point {
  const a = ((angle - 90) * Math.PI) / 180;
  return { x: center.x + distance * Math.cos(a), y: center.y + distance * Math.sin(a) };
}

/** The six corners of a pointy-top hexagon with the given corner radius, clockwise from the top. */
export function hexCorners(center: Point, radius: number): Point[] {
  return Array.from({ length: 6 }, (_, i) => polar(center, radius, i * 60));
}

/** Format points for an SVG polygon's `points` attribute. */
export function toPoints(points: Point[]): string {
  return points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
}

/** Pull a polygon towards its own centre, so neighbouring pieces show a thin gap. */
export function shrink(points: Point[], factor: number): Point[] {
  const c = {
    x: points.reduce((sum, p) => sum + p.x, 0) / points.length,
    y: points.reduce((sum, p) => sum + p.y, 0) / points.length,
  };
  return points.map((p) => ({ x: c.x + (p.x - c.x) * factor, y: c.y + (p.y - c.y) * factor }));
}

/** Position as a percentage of a stage, for placing HTML labels over an SVG. */
export function percent(p: Point, width: number, height: number): string {
  return `left: ${((p.x / width) * 100).toFixed(2)}%; top: ${((p.y / height) * 100).toFixed(2)}%;`;
}
