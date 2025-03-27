import { useState } from "react";

import { ClientData } from "../../../entities/client";
import { useModalForm } from "./hooks/useModalForm";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";

export interface ModalProps {
  isOpen: boolean;
  isEditing: boolean;
  isDelete: boolean;
  onClose: () => void;
  onSave?: (data: ClientData) => void;
  onUpdate?: (data: ClientData) => void;
  onDelete: () => void;
  clientData?: ClientData;
}

const Modal: React.FC<ModalProps> = (props) => {
  const {
    name,
    lastName,
    surname,
    contacts,
    errorsValidate,
    validationError,
    validationAttempt,
    setName,
    setLastName,
    setSurname,
    addContactForm,
    handleSave,
    handleDelete,
    handleClose,
    handleContactTypeChange,
    handleContactValueChange,
    handleDeleteContact,
  } = useModalForm(props);

  // Локальное состояние для подтверждения удаления в режиме редактирования
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Если редактирование – при первом клике переходим в режим подтверждения
  const triggerConfirmDelete = () => {
    setConfirmDelete(true);
  };

  // Если пользователь решает отменить подтверждение, сбрасываем confirmDelete
  const cancelConfirmDelete = () => {
    setConfirmDelete(false);
  };

  // Если подтверждение уже установлено – выполняем реальное удаление
  const handleDeleteFinal = () => {
    handleDelete();
  };

  // Для редактирования вместо props.isDelete используем локальное состояние
  const deletionMode = props.isEditing ? confirmDelete : props.isDelete;

  return (
    <div
      className={`fixed z-10 inset-0 overflow-hidden flex items-center justify-center transition-opacity duration-500 ${
        props.isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      <div
        className="
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
        "
      >
        <ModalHeader
          isDelete={deletionMode}
          isEditing={props.isEditing}
          clientData={props.clientData}
          onClose={props.isEditing && confirmDelete ? cancelConfirmDelete : handleClose}
        />
        {deletionMode ? null : (
          <ModalBody
            isEditing={props.isEditing}
            contacts={contacts}
            name={name}
            lastName={lastName}
            surname={surname}
            errorsValidate={errorsValidate}
            validationError={validationError}
            validationAttempt={validationAttempt}
            onNameChange={setName}
            onLastNameChange={setLastName}
            onSurnameChange={setSurname}
            onContactTypeChange={handleContactTypeChange}
            onContactValueChange={handleContactValueChange}
            onAddContact={addContactForm}
            onContactDelete={handleDeleteContact}
          />
        )}
        <ModalFooter
          isDelete={deletionMode}
          isEditing={props.isEditing}
          onSave={handleSave}
          onDelete={
            props.isEditing
              ? confirmDelete
                ? handleDeleteFinal
                : triggerConfirmDelete
              : handleDelete
          }
          onClose={props.isEditing && confirmDelete ? cancelConfirmDelete : handleClose}
        />
      </div>
    </div>
  );
};

export default Modal;
