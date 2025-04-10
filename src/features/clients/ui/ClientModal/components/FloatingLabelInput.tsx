import { memo, useEffect, useRef, useState } from "react";

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isEditing?: boolean;
  value: string;
  onValueChange: (value: string) => void;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = memo(
  ({ label, error, isEditing, value, onValueChange, className = "", ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isShaking, setIsShaking] = useState(false);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.value = value;
      }
    }, [value]);

    useEffect(() => {
      if (error) {
        setIsShaking(true);
        const timer = setTimeout(() => setIsShaking(false), 500);
        return () => clearTimeout(timer);
      }
    }, [error]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange(e.target.value);
    };

    const handleBlur = () => {
      if (inputRef.current) {
        onValueChange(inputRef.current.value);
      }
    };

    return (
      <div className={`mb-4 relative ${isShaking ? "shake" : ""}`}>
        <input
          ref={inputRef}
          type="text"
          {...rest}
          placeholder=" "
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`
            mt-1
            block
            text-sm
            font-semibold
            w-full
            h-[40px]
            outline-none
            border-b-[1px]
            peer
            ${error ? "border-red" : "border-gray"}
            ${className}
          `}
        />
        <label
          htmlFor={rest.id || ""}
          className={`
            absolute left-0
            transition-all
            duration-300
            text-grey
            pointer-events-none
            text-xs -top-2
            ${error ? "text-red" : "text-gray"}
            peer-placeholder-shown:text-sm
            peer-placeholder-shown:top-1/2
            peer-placeholder-shown:-translate-y-1/2
            peer-focus:text-xs
            peer-focus:-top-2
            peer-focus:-translate-y-0
            `}
        >
          {label}
          {!isEditing && <span className="text-firm font-bold">*</span>}
        </label>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.error === nextProps.error &&
      prevProps.isEditing === nextProps.isEditing
    );
  }
);

export default FloatingLabelInput;
