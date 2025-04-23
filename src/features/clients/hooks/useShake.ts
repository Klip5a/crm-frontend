import { useEffect, useState } from "react";

export function useShake(trigger: boolean, attempt: unknown, duration: number = 500): boolean {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (!trigger) return;

    setIsShaking(true);

    const timer = setTimeout(() => setIsShaking(false), duration);
    return () => clearTimeout(timer);
  }, [attempt, trigger, duration]);

  return isShaking;
}
