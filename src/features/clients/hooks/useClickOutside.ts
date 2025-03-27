import { useCallback, useEffect, useRef } from "react";

type EventTypes = MouseEvent | TouchEvent;

/**
 * Хук для обработки клика вне определенной области.
 * @param {Function} onClickOutside - Callback-функция, которая будет вызываться при клике вне области.
 */
export const useClickOutside = (onClickOutside: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: EventTypes) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    },
    [ref, onClickOutside]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [handleClickOutside]);

  return ref;
};
