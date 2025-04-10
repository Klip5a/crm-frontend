import { useState } from "react";

import { Client } from "@entities/client";
import Modal from "@shared/ui/Modal";

import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";

import { useModalForm } from "../../hooks/useModalForm";

export interface ClientModalProps {
  isOpen: boolean;
  isEditing: boolean;
  isDelete: boolean;
  onClose: () => void;
  onSave?: (data: Client) => void;
  onUpdate?: (data: Client) => void;
  onDelete: () => void;
  client?: Client;
}

const ClientModal: React.FC<ClientModalProps> = (props) => {
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
  //

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
    <Modal
      isOpen={props.isOpen}
      onClose={props.isEditing && confirmDelete ? cancelConfirmDelete : handleClose}
    >
      <ModalHeader
        isDelete={deletionMode}
        isEditing={props.isEditing}
        client={props.client}
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
    </Modal>
  );
};

export default ClientModal;
