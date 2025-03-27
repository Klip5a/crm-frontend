import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ClientContact } from "../../../../entities/client/types";
import { formatPhoneNumber } from "../lib/phoneFormatter";
import CustomSelect from "./CustomSelect";
import { DeleteIcon } from "./DeleteIcon";

const CONTACT_TYPES = ["Телефон", "Доп. телефон", "Email", "VK", "Facebook", "Другое"] as const;
const PHONE_TYPES = ["Телефон", "Доп. телефон"] as const;

const COMMON_INPUT_CLASSES =
  "block w-full pl-3 text-sm font-semibold bg-[#f4f3f6] border-solid border-x-[1px] border-grey focus:outline-none";

const isPhoneTypeCheck = (type: string) =>
  PHONE_TYPES.includes(type as (typeof PHONE_TYPES)[number]);

interface ContactFormProps {
  clientContact: ClientContact;
  index: number;
  isNewContact: boolean;
  isEditing: boolean;
  errorMessage?: string;
  validationAttempt: number;
  contacts: ClientContact[];
  handleChangeType: (index: number, value: string) => void;
  handleChangeValue: (index: number, value: string) => void;
  handleDelete: (index: number) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  clientContact,
  index,
  isNewContact,
  isEditing,
  errorMessage,
  validationAttempt,
  contacts,
  handleChangeType,
  handleChangeValue,
  handleDelete,
}) => {
  const [isShaking, setIsShaking] = useState(false);
  const [displayValue, setDisplayValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isPhoneType = useMemo(() => isPhoneTypeCheck(clientContact.type), [clientContact.type]);

  useEffect(() => {
    if (!isNewContact || clientContact.type) return;

    const hasPhoneContacts = contacts.some((contact) => contact.type === "Телефон");
    const newType = hasPhoneContacts ? "Доп. телефон" : "Телефон";

    if (clientContact.type !== newType) {
      handleChangeType(index, newType);
    }
  }, [isNewContact, clientContact.type, index, contacts, handleChangeType]);

  useEffect(() => {
    if (!errorMessage) return;

    setIsShaking(true);
    const timer = setTimeout(() => setIsShaking(false), 500);
    return () => clearTimeout(timer);
  }, [errorMessage, validationAttempt]);

  useEffect(() => {
    if (isPhoneType && clientContact.value) {
      const { formatted } = formatPhoneNumber(clientContact.value, 0);
      setDisplayValue(formatted);
    } else {
      setDisplayValue(clientContact.value);
    }
  }, [isPhoneType, clientContact.value]);

  const containerClassName = useMemo(() => {
    const baseClass =
      "flex border-solid border-[1px] transform transition-all duration-300 ease-in-out opacity-100 translate-y-0 relative";
    const borderClass = errorMessage ? "border-red" : "border-grey";
    const animationClass = isShaking ? "shake" : "";
    return `${baseClass} ${borderClass} ${animationClass}`;
  }, [errorMessage, isShaking]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const caretPosition = e.target.selectionStart || 0;

      if (isPhoneType) {
        const { formatted, newCaretPosition } = formatPhoneNumber(value, caretPosition);

        setDisplayValue(formatted);

        const digitsOnly = formatted.replace(/\D/g, "");
        handleChangeValue(index, digitsOnly);

        requestAnimationFrame(() => {
          if (inputRef.current) {
            inputRef.current.setSelectionRange(newCaretPosition, newCaretPosition);
          }
        });
      } else {
        setDisplayValue(value);
        handleChangeValue(index, value);
      }
    },
    [isPhoneType, index, handleChangeValue]
  );

  const handleTypeChange = useCallback(
    (selectedType: string) => {
      setDisplayValue("");
      handleChangeValue(index, "");
      handleChangeType(index, selectedType);
    },
    [index, handleChangeType, handleChangeValue]
  );

  return (
    <div className="px-6 pt-[15px]">
      <div className={containerClassName}>
        <CustomSelect
          value={clientContact.type}
          options={CONTACT_TYPES}
          onChange={handleTypeChange}
          disabled={!isNewContact && isEditing}
        />
        <input
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          ref={inputRef}
          className={COMMON_INPUT_CLASSES}
          placeholder={isPhoneType ? "+7 (___) ___-__-__" : "Введите данные контакта"}
        />
        <button
          type="button"
          onClick={() => handleDelete(index)}
          className="button-deleteContact relative flex justify-center items-center w-[42px] focus:outline-none after:absolute after:border-none after:border-[1px] hover:after:w-[calc(100%+2px)] hover:after:h-[calc(100%+2px)] hover:after:border-solid hover:after:border-red transition-all duration-200"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

const ContactFormComponent = memo(ContactForm);
ContactFormComponent.displayName = "ContactForm";

export default ContactFormComponent;
