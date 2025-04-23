import React, { useLayoutEffect, useState } from "react";

export interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [animate, setAnimate] = useState(false);
  const animationDuration = 500;

  useLayoutEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
        });
      });
    } else {
      setAnimate(false);
      const timer = setTimeout(() => setShouldRender(false), animationDuration);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed z-10 inset-0 overflow-hidden flex items-center justify-center transition-all duration-500 ${
        animate ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      style={{ transitionDuration: `${animationDuration}ms` }}
    >
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      <div
        className={`
          relative
          bg-white
          text-left
          overflow-y-auto
          transform
          transition-all
          max-w-[450px]
          w-full
          pt-4
          max-h-[calc(100vh-100px)]
          ${animate ? "scale-100" : "scale-95"}
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
