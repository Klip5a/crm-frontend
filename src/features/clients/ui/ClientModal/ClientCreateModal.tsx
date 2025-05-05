import { FormProvider } from "react-hook-form";

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
import { collectErrorMessages } from "./lib/collectErrorsMessages";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";

const ClientCreateModal: React.FC<ModalProps> = ({ selectedClient, isOpen }) => {
  const { close } = useOpenModal();
  const { createClient } = useClients();
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

  const onSave = async (data: ClientFormValues) => {
    // console.log("onSave вызван!");
    // console.log("SUBMIT DATA:", JSON.stringify(data, null, 2));
    // console.log("Текущие ошибки:", JSON.stringify(errors, null, 2));
    // console.log(data);
    try {
      await createClient({
        ...data,
        contacts: data.contacts,
      });
      addNotification("success", `Клиент ${data.name} создан успешно`, 5000);
      reset();
      close();
    } catch (error) {
      addNotification("error", "Ошибка при создании клиента", 5000);
      setValidationAttempt((prev) => prev + 1);
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

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader
        // isDelete={isDelete}
        // isEditing={isEditing}
        // selectedClient={selectedClient}
        title="Новый клиент"
        onClose={close}
      />
      <ModalBody
        inputs={
          <>
            <FloatingLabelInput
              label="Фамилия"
              //   isEditing={isEditing}
              {...register("lastName")}
              error={!!errors.lastName}
              validationAttempt={validationAttempt}
            />
            <FloatingLabelInput
              label="Имя"
              //   isEditing={isEditing}
              {...register("name")}
              error={!!errors.name}
              validationAttempt={validationAttempt}
            />
            <FloatingLabelInput
              label="Отчество"
              //   isEditing={isEditing}
              {...register("surname")}
              error={!!errors.surname}
              validationAttempt={validationAttempt}
            />
          </>
        }
        contacts={
          <FormProvider {...formMethods}>
            {fields.map((field, idx) => (
              <ContactForm
                key={field.id}
                index={idx}
                field={field}
                errorMessage={errors.contacts?.[idx]?.value?.message}
                remove={remove}
                validationAttempt={validationAttempt}
              />
            ))}
          </FormProvider>
        }
        hasContacts={fields.length > 0}
        addContact={<AddContactButton onClick={handleAddContact} hasContacts={fields.length > 0} />}
        error={collectErrorMessages(errors).join("\n")}
      />

      <ModalFooter
        // isDelete={isDelete}
        // isEditing={isEditing}
        textButton="Сохранить"
        onSubmit={handleSubmit(onSave, () => setValidationAttempt((prev) => prev + 1))}
        // onSave={wrappedHandleSubmit}
        // onDelete={handleDelete}
        onClose={close}
      />
    </Modal>
  );
};

export default ClientCreateModal;
