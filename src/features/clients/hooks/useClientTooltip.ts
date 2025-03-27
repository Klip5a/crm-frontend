import { useState } from "react";

export const useClientTooltip = () => {
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);
  const [isTooltipClicked, setIsTooltipClicked] = useState<boolean>(false);

  const handleMouseEnter = (index: number) => {
    setTooltipIndex(index);
    setIsTooltipOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isTooltipClicked) {
      setTooltipIndex(null);
    }
    setIsTooltipOpen(false);
  };

  const handleMouseClick = (index: number) => {
    setIsTooltipOpen(true);
    setTooltipIndex(index);
    setIsTooltipClicked(true);
  };

  const resetTooltip = () => {
    setIsTooltipOpen(false);
    setTooltipIndex(null);
    setIsTooltipClicked(false);
  };

  return {
    tooltipIndex,
    isTooltipOpen,
    isTooltipClicked,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseClick,
    resetTooltip,
  };
};
