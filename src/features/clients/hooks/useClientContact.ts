import { ClientContactExtended } from "./useClientForm";

type UseClientContactProps = {
  contacts: ClientContactExtended[];
  setContacts: (contacts: ClientContactExtended[]) => void;
};

function updateAtIndex<T>(array: readonly T[], index: number, updater: (item: T) => T): T[] {
  return array.map((item, i) => (i === index ? updater(item) : item));
}

export function useClientContact({ contacts, setContacts }: UseClientContactProps) {
  // setContacts: React.Dispatch<React.SetStateAction<ClientContactExtended[]>>
  // const [contacts, setContacts] = useState<ClientContactExtended[]>([]);

  const addContact = () => {
    // setContacts((prevForms) => [...prevForms, { type: "", value: "", isNew: true }]);
    setContacts([...contacts, { type: "", value: "", isNew: true }]);
  };

  const handleContactTypeChange = (index: number, value: string) => {
    // setContacts((prevForms) => {
    //   const updateForms = [...prevForms];
    //   if (updateForms[index]) {
    //     updateForms[index].type = value;
    //   }
    //   return updateForms;
    // });
    setContacts(
      updateAtIndex(contacts, index, (c) => ({
        ...c,
        type: value,
      }))
    );
  };

  const handleContactValueChange = (index: number, value: string) => {
    // setContacts((prevForms) => {
    //   const updatedForms = [...prevForms];
    //   if (updatedForms[index]) {
    //     updatedForms[index].value = value;
    //   }
    //   return updatedForms;
    // });
    setContacts(
      updateAtIndex(contacts, index, (c) => ({
        ...c,
        value,
      }))
    );
  };

  const handleDeleteContact = (index: number) => {
    // setContacts((prevForms) => {
    //   const updatedForms = [...prevForms];
    //   updatedForms.splice(index, 1);
    //   return updatedForms.map((form, idx) => ({ ...form, index: idx }));
    // });
    setContacts(
      contacts.filter((_, i) => {
        i !== index;
      })
    );

    // Удаляем ошибку для контакта
    // setErrorsValidate((prevErrors) => {
    //   const newErrors = { ...prevErrors };
    //   delete newErrors[`contact_${index}`];
    //   setValidationError(Object.values(newErrors).join("\n")); // обновляем validationError
    //   return newErrors;
    // });
  };

  return {
    // contacts,
    // setContacts,
    addContact,
    handleContactTypeChange,
    handleContactValueChange,
    handleDeleteContact,
  };
}
