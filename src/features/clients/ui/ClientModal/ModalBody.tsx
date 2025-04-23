import { AnimatePresence, motion } from "framer-motion";

// import React from "react";
// import React, { useCallback } from "react";
// import AddContactButton from "./components/AddContactButton";
// import ContactForm from "./components/ContactForm";

// import FloatingLabelInput from "./components/FloatingLabelInput";
// import { ClientContactExtended } from "../../hooks/useModalForm";

const ANIMATION_CONFIG = {
  duration: 0.3,
  ease: "easeInOut",
} as const;

const CONTACTS_BG_STYLE = { backgroundColor: "rgba(200, 197, 209, 0.3)" } as const;

interface ModalBodyProps {
  // isEditing: boolean;
  // contacts: ClientContactExtended[];
  // name: string;
  // lastName: string;
  // surname: string;
  inputs: React.ReactNode;
  contacts: React.ReactNode;
  hasContacts: boolean;
  addContact: React.ReactNode;
  // errorsValidate: Record<string, string>;
  validationError: string;
  // validationAttempt: number;
  // onNameChange: (value: string) => void;
  // onLastNameChange: (value: string) => void;
  // onSurnameChange: (value: string) => void;
  // onContactTypeChange: (index: number, value: string) => void;
  // onContactValueChange: (index: number, value: string) => void;
  // onAddContact: () => void;
  // onContactDelete: (index: number) => void;
}

const ModalBody: React.FC<ModalBodyProps> = ({
  inputs,
  contacts,
  hasContacts,
  addContact,
  validationError,
  // onAddContact,
}) => {
  // const hasContacts = contacts.length > 0;

  return (
    <>
      <div className="px-7 pb-2">
        <div className="mt-4">{inputs}</div>
      </div>
      <div style={CONTACTS_BG_STYLE} className="relative">
        <motion.div
          className="relative"
          initial={false}
          animate={{
            height: hasContacts ? "auto" : 0,
            opacity: hasContacts ? 1 : 0,
          }}
          transition={ANIMATION_CONFIG}
        >
          <AnimatePresence initial={false}>{contacts}</AnimatePresence>
        </motion.div>

        <motion.div
          animate={{
            paddingBottom: hasContacts ? "15px" : "0",
          }}
          transition={ANIMATION_CONFIG}
        >
          {addContact}
        </motion.div>
      </div>

      {validationError && (
        <div className={`text-center ${validationError ? "pt-5 px-5" : "pt-0"}`}>
          {validationError.split("\n").map((msg, index) => (
            <p className="text-red text-[13px]" key={index}>
              {msg}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default ModalBody;
