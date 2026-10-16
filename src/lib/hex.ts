/** Geometry helpers for pointy-top hexagons drawn in SVG. */

const SQRT3 = Math.sqrt(3);

/** SVG `points` string for a pointy-top hexagon centred on (cx, cy) with circumradius r. */
export function hexPoints(cx: number, cy: number, r: number): string {
  return [-90, -30, 30, 90, 150, 210]
    .map((deg) => {
      const rad = (deg * Math.PI) / 180;
      return `${(cx + r * Math.cos(rad)).toFixed(2)},${(cy + r * Math.sin(rad)).toFixed(2)}`;
    })
    .join(' ');
}

/** Centre hexagon plus its six neighbours: one company, six founders. */
export function honeycomb(cx: number, cy: number, r: number): Array<{ x: number; y: number }> {
  const dx = SQRT3 * r;
  const dy = 1.5 * r;
  return [
    { x: cx, y: cy },
    { x: cx + dx, y: cy },
    { x: cx + dx / 2, y: cy + dy },
    { x: cx - dx / 2, y: cy + dy },
    { x: cx - dx, y: cy },
    { x: cx - dx / 2, y: cy - dy },
    { x: cx + dx / 2, y: cy - dy },
  ];
}
