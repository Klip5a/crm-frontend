import { useEffect, useRef, useState } from "react";

const CustomSelect: React.FC<{
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  disabled: boolean;
}> = ({ value, options, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    onChange(option);
    toggleSelect();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        dropdownRef.current &&
        !selectRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={selectRef}>
      <div className="relative" onClick={toggleSelect}>
        <div
          className={`
            relative
            inline-flex
            items-center
            bg-[#e7e5eb]
            min-w-[110px]
            h-[37px]
            text-black
            text-xs
            px-3
            focus:outline-none
            ${disabled ? "" : "cursor-pointer"}
          `}
        >
          <span>{value}</span>
        </div>
        {!disabled && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={isOpen ? "transform rotate-180" : ""}
            >
              <path
                d="M9.50497 5.30979C9.74997 5.06479 9.74997 4.66978 9.50497 4.42478L5.34997 0.269785C5.15497 0.074785 4.83997 0.0747849 4.64497 0.269785L0.489969 4.42478C0.244969 4.66978 0.244969 5.06478 0.489969 5.30978C0.734969 5.55478 1.12997 5.55478 1.37497 5.30978L4.99997 1.68978L8.62497 5.31478C8.86497 5.55478 9.26497 5.55479 9.50497 5.30979Z"
                fill="#9873FF"
              />
            </svg>
          </div>
        )}
      </div>
      {isOpen && !disabled && (
        <div
          ref={dropdownRef}
          className="absolute w-full bg-[#f4f3f6] border-grey border-[1px] border-t-0"
          style={{ zIndex: 9999, position: "absolute" }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className="block px-3 py-2 text-black text-xs hover:bg-[#e7e5eb] cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
