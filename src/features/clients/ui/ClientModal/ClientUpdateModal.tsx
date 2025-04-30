import { motion } from "framer-motion";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import { Client } from "@entities/client";
import { ClientFormValues } from "@entities/client/schema";
import { useClientForm } from "@features/clients/hooks/useClientForm";
import { useClients } from "@features/clients/hooks/useClients";
// import { useClients } from "@features/clients/hooks/useClients";
// import { useClientModal } from "@features/clients/hooks/useModal";
import { useOpenModal } from "@features/clients/hooks/useOpenModal";
import { useNotification } from "@shared/hooks/useNotification";
import Modal from "@shared/ui/Modal";

import AddContactButton from "./components/AddContactButton";
import ContactForm from "./components/ContactForm";
import FloatingLabelInput from "./components/FloatingLabelInput";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";

// import { useModalForm } from "../../hooks/useModalForm";

interface ModalProps {
  selectedClient: Client | null;
  isOpen: boolean;
  isEditing?: boolean;
  isDelete?: boolean;
}

const ClientUpdateModal: React.FC<ModalProps> = ({ selectedClient, isOpen, isEditing }) => {
  const { close } = useOpenModal();
  const { updateClient } = useClients();
  const { addNotification } = useNotification();
  const formMethods = useClientForm(selectedClient);
  const {
    formState: { errors },
    fields,
    register,
    handleAddContact,
    remove,
    handleSubmit,
    reset,
  } = formMethods;

  useEffect(() => {
    if (selectedClient) {
      reset({
        lastName: selectedClient.lastName,
        name: selectedClient.name,
        surname: selectedClient.surname,
        contacts: selectedClient.contacts.map((c) => ({
          id: c.id || crypto.randomUUID(),
          type: c.type,
          value: c.value,
        })),
      });
    }
  }, [reset, selectedClient]);

  const formValues = formMethods.watch();

  useEffect(() => {
    console.log("FORM VALUES UPDATED:", formValues);
  }, [formValues]);

  if (!isOpen || !selectedClient) return null;

  const onSave = async (data: ClientFormValues) => {
    console.log("SUBMIT DATA:", JSON.stringify(data, null, 2));

    try {
      await updateClient({
        id: selectedClient.id,
        ...data,
        contacts: data.contacts,
        createdAt: selectedClient.createdAt,
        updatedAt: new Date().toISOString(),
      });
      addNotification("success", `Клиент ${data.name} обновлен успешно`, 5000);
      reset();
      close();
    } catch (error) {
      addNotification("error", "Ошибка при сохранении клиента", 5000);
    }
  };

  const contactsNodes = fields.map((field, idx) => (
    <motion.div
      key={field.id}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ position: "relative", zIndex: 10 - idx }}
    >
      <ContactForm
        // key={field.id}
        index={idx}
        errorMessage={errors.contacts?.[idx]?.value?.message}
        remove={remove}
        // validationAttempt={validationAttempt}
      />
    </motion.div>
  ));

  return (
    <Modal isOpen={isOpen}>
      <FormProvider {...formMethods}>
        <ModalHeader
          // isDelete={isDelete}
          // isEditing={isEditing}
          // selectedClient={selectedClient}
          title={
            <>
              Изменить данные
              <span className="ml-2 text-xs text-txt-grey font-normal">
                ID: {selectedClient?.id}
              </span>
            </>
          }
          onClose={close}
        />
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
                isEditing={isEditing}
                {...register("lastName")}
                error={errors.lastName?.message}
                // id="last_name"
                // value={formData.lastName}
                // onValueChange={(val) => {
                //   updateFields("lastName", val);
                // }}
                // error={errorsValidate.lastName}
                // validationAttempt={validationAttempt}
              />
              <FloatingLabelInput
                label="Имя"
                isEditing={isEditing}
                {...register("name")}
                error={errors.name?.message}
                // id="first_name"
                // value={formData.name}
                // onValueChange={(val) => {
                //   updateFields("name", val);
                // }}
                // error={errorsValidate.name}
              />
              <FloatingLabelInput
                label="Отчество"
                isEditing={isEditing}
                {...register("surname")}
                // id="middle_name"
                // value={formData.surname}
                // onValueChange={(val) => {
                //   updateFields("surname", val);
                // }}
                error={errors.surname?.message}
              />
            </>
          }
          contacts={contactsNodes}
          hasContacts={fields.length > 0}
          addContact={
            <AddContactButton onClick={handleAddContact} hasContacts={fields.length > 0} />
          }
          error={
            Array.isArray(errors.contacts)
              ? errors.contacts
                  .map((e) => (e?.value ? e.value.message : ""))
                  .filter(Boolean)
                  .join("\n")
              : ""
          }
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

        <ModalFooter
          // isDelete={isDelete}
          isEditing={isEditing}
          onSave={handleSubmit(onSave)}
          // onDelete={handleDelete}
          onClose={close}
        />
      </FormProvider>
    </Modal>
  );
};

export default ClientUpdateModal;
