import { AnimatePresence, motion } from "framer-motion";
import { useCallback } from "react";

import AddContactButton from "./components/AddContactButton";
import ContactForm from "./components/ContactForm";
import FloatingLabelInput from "./components/FloatingLabelInput";
import { ClientContactExtended } from "./hooks/useModalForm";

const ANIMATION_CONFIG = {
  duration: 0.3,
  ease: "easeInOut",
} as const;

const CONTACTS_BG_STYLE = { backgroundColor: "rgba(200, 197, 209, 0.3)" } as const;

interface ModalBodyProps {
  isEditing: boolean;
  contacts: ClientContactExtended[];
  name: string;
  lastName: string;
  surname: string;
  errorsValidate: Record<string, string>;
  validationError: string;
  validationAttempt: number;
  onNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onSurnameChange: (value: string) => void;
  onContactTypeChange: (index: number, value: string) => void;
  onContactValueChange: (index: number, value: string) => void;
  onAddContact: () => void;
  onContactDelete: (index: number) => void;
}

const ModalBody: React.FC<ModalBodyProps> = ({
  isEditing,
  contacts,
  name,
  lastName,
  surname,
  errorsValidate,
  validationError,
  validationAttempt,
  onNameChange,
  onLastNameChange,
  onSurnameChange,
  onContactTypeChange,
  onContactValueChange,
  onAddContact,
  onContactDelete,
}) => {
  const hasContacts = contacts.length > 0;

  const handleLastNameUpdate = useCallback(
    (value: string) => {
      onLastNameChange(value);
    },
    [onLastNameChange]
  );

  const handleNameUpdate = useCallback(
    (value: string) => {
      onNameChange(value);
    },
    [onNameChange]
  );

  const handleSurnameUpdate = useCallback(
    (value: string) => {
      onSurnameChange(value);
    },
    [onSurnameChange]
  );

  return (
    <>
      <div className="px-7 pb-2">
        <div className="mt-4">
          <FloatingLabelInput
            label="Фамилия"
            id="last_name"
            value={lastName}
            onValueChange={handleLastNameUpdate}
            error={errorsValidate.lastName}
            isEditing={isEditing}
          />
          <FloatingLabelInput
            label="Имя"
            id="first_name"
            value={name}
            onValueChange={handleNameUpdate}
            error={errorsValidate.name}
            isEditing={isEditing}
          />
          <FloatingLabelInput
            label="Отчество"
            id="middle_name"
            value={surname}
            onValueChange={handleSurnameUpdate}
            error={errorsValidate.surname}
            isEditing={isEditing}
          />
        </div>
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
          <AnimatePresence initial={false}>
            {contacts.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={ANIMATION_CONFIG}
                style={{ position: "relative", zIndex: 10 - index }}
              >
                <ContactForm
                  clientContact={contact}
                  index={index}
                  contacts={contacts}
                  isEditing={!contact.isNew}
                  isNewContact={contact.isNew}
                  errorMessage={errorsValidate[`contact_${index}`]}
                  validationAttempt={validationAttempt}
                  handleChangeType={onContactTypeChange}
                  handleChangeValue={onContactValueChange}
                  handleDelete={() => onContactDelete(index)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          animate={{
            paddingBottom: hasContacts ? "15px" : "0",
          }}
          transition={ANIMATION_CONFIG}
        >
          <AddContactButton onClick={onAddContact} hasContacts={hasContacts} />
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
