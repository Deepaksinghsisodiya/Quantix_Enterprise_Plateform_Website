import { useEffect, type RefObject } from 'react';

export function useOutsideClick(
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      if (!el || el.contains((event.target as Node) || null)) {
        return;
      }
      handler();
    };

    const keyListener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handler();
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    window.addEventListener('keydown', keyListener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
      window.removeEventListener('keydown', keyListener);
    };
  }, [ref, handler, enabled]);
}
