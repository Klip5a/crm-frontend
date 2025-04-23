import { useState } from "react";

import { Client, ClientContact } from "@entities/client";

export interface ClientContactExtended extends ClientContact {
  isNew: boolean;
}

type ClientFormState = {
  name: string;
  lastName: string;
  surname: string;
  contacts: ClientContactExtended[];
};

export function useClientForm(initialClient: Client | null) {
  const now = new Date().toISOString();

  const initialState: ClientFormState = {
    name: initialClient?.name ?? "",
    lastName: initialClient?.lastName ?? "",
    surname: initialClient?.surname ?? "",
    contacts: initialClient?.contacts.map((contact) => ({ ...contact, isNew: false })) ?? [],
  };

  const [formData, setFormData] = useState<ClientFormState>(initialState);

  const resetFields = () => setFormData(initialState);

  const updateFields = <Keys extends keyof ClientFormState>(
    field: Keys,
    value: ClientFormState[Keys]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const clientObject = (clientId: string): Omit<Client, "id"> | Client => {
    return {
      ...formData,
      contacts: formData.contacts.filter((contact) => contact.type !== "" || contact.value !== ""),
      createdAt: initialClient?.createdAt || now,
      updateAt: now,
      ...(clientId ? { id: clientId } : {}),
    };
  };

  return {
    formData,
    setFormData,
    resetFields,
    updateFields,
    clientObject,
  };

  //   const [name, setName] = useState<string>("");
  //   const [lastName, setLastName] = useState<string>("");
  //   const [surname, setSurname] = useState<string>("");
  //   const [contacts, setContacts] = useState<ClientContactExtended[]>([]);

  //   useEffect(() => {
  //     if (initialClient) {
  //       setLastName(initialClient.lastName);
  //       setName(initialClient.name);
  //       setSurname(initialClient.surname);
  //       setContacts(
  //         initialClient.contacts.map((contact: ClientContact) => ({
  //           ...contact,
  //           isNew: false,
  //         }))
  //       );
  //     }
  //   }, [initialClient]);

  //   const resetFields = () => {
  //     setLastName("");
  //     setName("");
  //     setSurname("");
  //     setContacts([]);
  //     // setErrorsValidate({});
  //     // setValidationError("");
  //   };

  //   const createClientObject = (clientId: string): Omit<Client, "id"> | Client => {
  //     const now = new Date().toISOString();
  //     const clientData = {
  //       name,
  //       lastName,
  //       surname,
  //       contacts: contacts.filter((contact) => contact.type !== "" || contact.value !== ""),
  //       createdAt: initialClient?.createdAt || now,
  //       updatedAt: now,
  //     };

  //     return clientId ? { ...clientData, id: clientId } : clientData;
  //   };

  //   return {
  //     name,
  //     lastName,
  //     surname,
  //     contacts,
  //     resetFields,
  //     createClientObject,
  //   };
}
