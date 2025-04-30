import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { Client, ClientContact } from "@entities/client";
import { clientFormSchema } from "@entities/client/schema";

export interface ClientContactExtended extends ClientContact {
  isNew: boolean;
}

export function useClientForm(initialClient: Client | null) {
  const form = useForm({
    resolver: zodResolver(clientFormSchema),
    defaultValues: initialClient
      ? {
          lastName: initialClient.lastName,
          name: initialClient.name,
          surname: initialClient.surname,
          contacts: initialClient.contacts.map((c) => ({
            id: c.id || crypto.randomUUID(),
            type: c.type,
            value: c.value,
          })),
        }
      : {
          lastName: "",
          name: "",
          surname: "",
          contacts: [],
        },
    mode: "onSubmit",
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "contacts",
  });

  const handleAddContact = () => {
    const existingTypes = fields.map((f) => f.type);
    const isPhoneExist = existingTypes.includes("Телефон");

    append({
      id: crypto.randomUUID(),
      type: isPhoneExist ? "Доп. телефон" : "Телефон",
      value: "",
    });
  };

  return {
    ...form,
    fields,
    handleAddContact,
    remove,
    replace,
  };
}
