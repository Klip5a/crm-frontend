import { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import { Client } from "@entities/client";
import { ClientFormValues } from "@entities/client/schema";
import { useClientForm } from "@features/clients/hooks/useClientForm";
import { useClients } from "@features/clients/hooks/useClients";
import { useOpenModal } from "@features/clients/hooks/useOpenModal";
import { ModalProps } from "@features/clients/interface/modal";
import { useNotification } from "@shared/hooks/useNotification";
import Modal from "@shared/ui/Modal";

import AddContactButton from "./components/AddContactButton";
import ContactForm from "./components/ContactForm";
import FloatingLabelInput from "./components/FloatingLabelInput";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";

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
    validationAttempt,
    setValidationAttempt,
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

  // useEffect(() => {
  //   const contacts = formMethods.getValues("contacts") ?? [];
  //   console.log("contacts:", contacts);
  //   console.log("fields.length", fields.length);
  //   console.log("contacts.length", contacts?.length ?? 0);

  //   console.log(
  //     "fields ids",
  //     fields.map((f) => f.id)
  //   );
  //   console.log(
  //     "contacts ids",
  //     contacts.map((f) => f && f.id)
  //   );
  //   console.log("contacts", contacts);
  // }, [fields]);

  if (!isOpen || !selectedClient) return null;

  const allErrors = [
    errors.lastName?.message,
    errors.name?.message,
    errors.surname?.message,
    ...(Array.isArray(errors.contacts)
      ? errors.contacts.map((e) => e?.value?.message).filter(Boolean)
      : []),
  ]
    .filter(Boolean)
    .join("\n");

  const onSave = async (data: ClientFormValues) => {
    // console.log("onSave вызван!");
    // console.log("SUBMIT DATA:", JSON.stringify(data, null, 2));
    console.log("Текущие ошибки:", JSON.stringify(errors, null, 2));
    // console.log(data);
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

  // const wrappedHandleSubmit = () => {
  //   console.log("handleSubmit вызван!");
  //   console.log("Текущее состояние формы:", formMethods.getValues());
  //   console.log("fields:", fields);
  //   console.log("Текущие ошибки:", errors);

  //   return handleSubmit(
  //     (data) => {
  //       console.log("Форма валидна, вызываем onSave");
  //       onSave(data);
  //     },
  //     (errors) => {
  //       console.log("Ошибки валидации:", errors);
  //       setValidationAttempt((prev) => prev + 1);
  //     }
  //   )();
  // };

  const contactsNodes = fields.map((field, idx) => (
    // <div>
    <ContactForm
      key={field.id}
      index={idx}
      field={field}
      errorMessage={errors.contacts?.[idx]?.value?.message}
      remove={remove}
      validationAttempt={validationAttempt}
    />
    // </div>
  ));

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader
        // isDelete={isDelete}
        // isEditing={isEditing}
        // selectedClient={selectedClient}
        title={
          <>
            Изменить данные
            <span className="ml-2 text-xs text-txt-grey font-normal">ID: {selectedClient?.id}</span>
          </>
        }
        onClose={close}
      />
      <ModalBody
        inputs={
          <>
            <FloatingLabelInput
              label="Фамилия"
              isEditing={isEditing}
              {...register("lastName")}
              error={errors.lastName?.message}
              validationAttempt={validationAttempt}
            />
            <FloatingLabelInput
              label="Имя"
              isEditing={isEditing}
              {...register("name")}
              error={errors.name?.message}
              validationAttempt={validationAttempt}
            />
            <FloatingLabelInput
              label="Отчество"
              isEditing={isEditing}
              {...register("surname")}
              error={errors.surname?.message}
              validationAttempt={validationAttempt}
            />
          </>
        }
        contacts={<FormProvider {...formMethods}>{contactsNodes}</FormProvider>}
        hasContacts={fields.length > 0}
        addContact={<AddContactButton onClick={handleAddContact} hasContacts={fields.length > 0} />}
        // error={
        //   Array.isArray(errors.contacts)
        //     ? errors.contacts
        //         .map((e) => (e?.value ? e.value.message : ""))
        //         .filter(Boolean)
        //         .join("\n")
        //     : ""
        // }
        error={allErrors}
      />

      <ModalFooter
        // isDelete={isDelete}
        isEditing={isEditing}
        textButton="Сохранить"
        // onSubmit={handleSubmit(onSave)}
        onSubmit={handleSubmit(
          onSave, // успешная валидация
          () => setValidationAttempt((prev) => prev + 1) // ошибки валидации
        )}
        // onSave={wrappedHandleSubmit}
        // onDelete={handleDelete}
        onClose={close}
      />
    </Modal>
  );
};

export default ClientUpdateModal;
