import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface TooltipPortalProps {
  targetRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
}

const TooltipPortal: React.FC<TooltipPortalProps> = ({ targetRef, children }) => {
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const tooltipRoot = document.getElementById("tooltip-root");

  useEffect(() => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      // Располагаем тултип сверху по центру от целевого элемента
      setPosition({
        top: rect.top,
        left: rect.left + rect.width / 2,
      });
    }
  }, [targetRef]);

  if (!tooltipRoot) return null;

  return ReactDOM.createPortal(
    <div
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        transform: "translate(-50%, -100%)",
        zIndex: 9999,
      }}
    >
      {children}
    </div>,
    tooltipRoot
  );
};

export default TooltipPortal;
