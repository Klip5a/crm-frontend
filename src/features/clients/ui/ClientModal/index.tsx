import { motion } from "framer-motion";

import { useClientForm } from "@features/clients/hooks/useClientForm";
import { useClientModal } from "@features/clients/hooks/useClientModal";
import { useClients } from "@features/clients/hooks/useClients";
import { useOpenModal } from "@features/clients/hooks/useOpenModal";
import Modal from "@shared/ui/Modal";

import AddContactButton from "./components/AddContactButton";
import ContactForm from "./components/ContactForm";
import FloatingLabelInput from "./components/FloatingLabelInput";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";

import { useModalForm } from "../../hooks/useModalForm";

const ClientModal = () => {
  const { isOpen, selectedClient, isEditing, isDelete } = useClientModal();
  const { close } = useOpenModal();

  const { formData, setFormData, resetFields, updateFields, clientObject } =
    useClientForm(selectedClient);

  // const { createClient, updateClient, deleteClient } = useClients();
  // const {
  //   name,
  //   lastName,
  //   surname,
  //   contacts,
  //   errorsValidate,
  //   validationError,
  //   validationAttempt,
  //   setName,
  //   setLastName,
  //   setSurname,
  //   addContactForm,
  //   handleSave,
  //   handleDelete,
  //   handleContactTypeChange,
  //   handleContactValueChange,
  //   handleDeleteContact,
  // } = useModalForm({
  //   isOpen,
  //   isEditing,
  //   isDelete,
  //   client: selectedClient,
  //   close,
  //   createClient,
  //   updateClient,
  //   deleteClient,
  // });

  const contactsNodes = formData.contacts.map((contact, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ position: "relative", zIndex: 10 - index }}
    >
      <ContactForm
        clientContact={contact}
        index={index}
        contacts={formData.contacts}
        isNewContact={contact.isNew}
        errorMessage={errorsValidate[`contact_${index}`]}
        validationAttempt={validationAttempt}
        handleChangeType={handleContactTypeChange}
        handleChangeValue={handleContactValueChange}
        handleDelete={() => handleDeleteContact(index)}
      />
    </motion.div>
  ));

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader
        isDelete={isDelete}
        isEditing={isEditing}
        selectedClient={selectedClient}
        onClose={close}
      />
      {isDelete ? null : (
        <ModalBody
          // isEditing={isEditing}
          // contacts={contacts}
          // name={name}
          // lastName={lastName}
          // surname={surname}
          inputs={
            <>
              <FloatingLabelInput
                label="Фамилия"
                // id="last_name"
                value={formData.lastName}
                onValueChange={(val) => {
                  updateFields("lastName", val);
                }}
                isEditing={isEditing}
                error={errorsValidate.lastName}
                validationAttempt={validationAttempt}
              />
              <FloatingLabelInput
                label="Имя"
                // id="first_name"
                value={formData.name}
                onValueChange={(val) => {
                  updateFields("name", val);
                }}
                error={errorsValidate.name}
                isEditing={isEditing}
              />
              <FloatingLabelInput
                label="Отчество"
                // id="middle_name"
                value={formData.surname}
                onValueChange={(val) => {
                  updateFields("surname", val);
                }}
                error={errorsValidate.surname}
                isEditing={isEditing}
              />
            </>
          }
          contacts={contactsNodes}
          hasContacts={formData.contacts.length > 0}
          addContact={
            <AddContactButton onClick={addContactForm} hasContacts={formData.contacts.length > 0} />
          }
          validationError={validationError}
          // errorsValidate={errorsValidate}
          // validationAttempt={validationAttempt}
          // onNameChange={setName}
          // onLastNameChange={setLastName}
          // onSurnameChange={setSurname}
          // onContactTypeChange={handleContactTypeChange}
          // onContactValueChange={handleContactValueChange}
          // onAddContact={addContactForm}
          // onContactDelete={handleDeleteContact}
        />
      )}
      <ModalFooter
        isDelete={isDelete}
        isEditing={isEditing}
        onSave={handleSave}
        onDelete={handleDelete}
        onClose={close}
      />
    </Modal>
  );
};

export default ClientModal;
