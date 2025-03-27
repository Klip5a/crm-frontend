import { useCallback, useRef } from "react";

import addContactIcon from "../../../assets/addContact.svg";
import addContactHoverIcon from "../../../assets/addContactHover.svg";

interface AddContactButtonProps {
  onClick: () => void;
  hasContacts: boolean;
}

const AddContactButton: React.FC<AddContactButtonProps> = ({ onClick, hasContacts }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (imgRef.current) {
      imgRef.current.src = addContactHoverIcon;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (imgRef.current) {
      imgRef.current.src = addContactIcon;
    }
  }, []);

  return (
    <button
      onClick={onClick}
      type="button"
      className={`
        h-[35px]
        flex
        items-center
        justify-center
        w-full
        text-black
        text-sm
        font-bold
        hover:text-firm
        transition-all
        duration-200
        ease-in-out
        ${hasContacts ? "mt-5" : "mt-0"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img ref={imgRef} src={addContactIcon} alt="" className="mr-1 transition-all duration-200" />
      Добавить контакт
    </button>
  );
};

export default AddContactButton;
