/**
 * Layout rules for the social proof ribbon.
 *
 * The ribbon normally shows four metrics, but Admin can publish any number. The columns
 * adapt to the real count so a single metric spans the full width instead of hugging one
 * quarter of the strip with dead space beside it, and three metrics fill the row rather
 * than leaving a gap. Zero metrics render nothing at all (handled by the callers).
 */

export interface RibbonLayout {
  /** Tailwind grid columns for the ribbon container. */
  gridClass: string;
  /** Columns at the default (mobile-first) breakpoint. */
  baseCols: number;
  /** Columns from `wideBp` upwards. */
  wideCols: number;
  /** Breakpoint prefix that introduces `wideCols`. */
  wideBp: Breakpoint;
}

export type Breakpoint = '' | 'sm:' | 'md:';

export const RIBBON_LAYOUT_BY_COUNT: Record<number, RibbonLayout> = {
  1: { gridClass: 'grid-cols-1', baseCols: 1, wideCols: 1, wideBp: 'md:' },
  2: { gridClass: 'grid-cols-2', baseCols: 2, wideCols: 2, wideBp: 'md:' },
  3: { gridClass: 'grid-cols-2 sm:grid-cols-3', baseCols: 2, wideCols: 3, wideBp: 'sm:' },
  4: { gridClass: 'grid-cols-2 md:grid-cols-4', baseCols: 2, wideCols: 4, wideBp: 'md:' },
};

/** Above four the cells would get too narrow to read, so the four column grid is kept. */
export const MAX_RIBBON_CARDS = 4;

export const RIBBON_DIVIDER = 'border-slate-200/70 dark:border-slate-800/70';

/**
 * Border utilities are listed as complete literals on purpose.
 *
 * Tailwind scans source text for whole class names, so a class assembled at runtime from
 * a breakpoint prefix (`${bp}border-r`) is never emitted into the stylesheet and silently
 * does nothing. Every variant used here is therefore spelled out in full below.
 */
const BORDER_R_ON: Record<Breakpoint, string> = {
  '': 'border-r',
  'sm:': 'sm:border-r',
  'md:': 'md:border-r',
};

const BORDER_R_OFF: Record<Breakpoint, string> = {
  '': 'border-r-0',
  'sm:': 'sm:border-r-0',
  'md:': 'md:border-r-0',
};

const BORDER_B_ON: Record<Breakpoint, string> = {
  '': 'border-b',
  'sm:': 'sm:border-b',
  'md:': 'md:border-b',
};

const BORDER_B_OFF: Record<Breakpoint, string> = {
  '': 'border-b-0',
  'sm:': 'sm:border-b-0',
  'md:': 'md:border-b-0',
};

export function getRibbonLayout(count: number): RibbonLayout {
  return RIBBON_LAYOUT_BY_COUNT[count] ?? RIBBON_LAYOUT_BY_COUNT[MAX_RIBBON_CARDS]!;
}

/**
 * Builds the separator borders for one cell at a given breakpoint.
 *
 * A cell keeps a right border only when another cell actually sits beside it, and a
 * bottom border only when a row follows it. Both are evaluated per breakpoint because the
 * column count changes between them, and a short final row is accounted for so the lone
 * card in that row does not pick up a border against the container edge.
 */
export function getRibbonSeparator(
  index: number,
  count: number,
  cols: number,
  bp: Breakpoint
): string {
  const rowStart = Math.floor(index / cols) * cols;
  const positionInRow = index - rowStart;
  const cellsInRow = Math.min(cols, count - rowStart);
  const isLastInRow = positionInRow >= cellsInRow - 1;
  // Based on the row, not the cell: when the final row is short (3 cards on a 2 column
  // grid) every cell of the row above still needs the separator, otherwise the divider
  // under the row's last cell is dropped.
  const hasRowBelow = rowStart + cols < count;

  return [
    isLastInRow ? BORDER_R_OFF[bp] : `${BORDER_R_ON[bp]} ${RIBBON_DIVIDER}`,
    hasRowBelow ? `${BORDER_B_ON[bp]} ${RIBBON_DIVIDER}` : BORDER_B_OFF[bp],
  ].join(' ');
}
