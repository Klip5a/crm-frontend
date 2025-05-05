import { forwardRef, memo } from "react";

import { useShake } from "@shared/hooks/useShake";

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isEditing?: boolean;
  error: boolean;
  validationAttempt: number;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = memo(
  forwardRef<HTMLInputElement, FloatingLabelInputProps>(
    ({ label, error, isEditing, validationAttempt, onBlur, ...rest }, ref) => {
      const isShaking = useShake(!!error, validationAttempt);
      const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (onBlur) onBlur(event);
      };

      return (
        <div className={`mb-4 relative ${isShaking ? "shake" : ""}`}>
          <input
            ref={ref}
            type="text"
            {...rest}
            placeholder=" "
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
    }
  )
);

export default FloatingLabelInput;
