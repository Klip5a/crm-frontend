import { useCallback, useState } from "react";

import { ClientContact } from "@entities/client";

export interface ClientContactExtended extends ClientContact {
  isNew: boolean;
}

export function useClientContact() {
  // setContacts: React.Dispatch<React.SetStateAction<ClientContactExtended[]>>
  // const [contacts, setContacts] = useState<ClientContactExtended[]>([]);

  const addContact = useCallback(() => {
    setContacts((prevForms) => [...prevForms, { type: "", value: "", isNew: true }]);
  }, [setContacts]);

  const handleContactTypeChange = useCallback(
    (index: number, value: string) => {
      setContacts((prevForms) => {
        const updateForms = [...prevForms];
        if (updateForms[index]) {
          updateForms[index].type = value;
        }
        return updateForms;
      });
    },
    [setContacts]
  );

  const handleContactValueChange = (index: number, value: string) => {
    setContacts((prevForms) => {
      const updatedForms = [...prevForms];
      if (updatedForms[index]) {
        updatedForms[index].value = value;
      }
      return updatedForms;
    });
  };

  const handleDeleteContact = (index: number) => {
    setContacts((prevForms) => {
      const updatedForms = [...prevForms];
      updatedForms.splice(index, 1);
      return updatedForms.map((form, idx) => ({ ...form, index: idx }));
    });

    // Удаляем ошибку для контакта
    // setErrorsValidate((prevErrors) => {
    //   const newErrors = { ...prevErrors };
    //   delete newErrors[`contact_${index}`];
    //   setValidationError(Object.values(newErrors).join("\n")); // обновляем validationError
    //   return newErrors;
    // });
  };

  return {
    contacts,
    setContacts,
    addContact,
    handleContactTypeChange,
    handleContactValueChange,
    handleDeleteContact,
  };
}
