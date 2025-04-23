import { Client, ClientContact } from "@entities/client";
import { useNotification } from "@shared/hooks/useNotification";

import { useClients } from "./useClients";

export function useClientOperation(
  //   createClientFn: (c: Omit<Client, "id">) => Promise<void>,
  //   updateClientFn: (c: Client) => Promise<void>,
  //   deleteClientFn: (id: string) => Promise<void>,
  selectedClient: Client,
  //   contacts: ClientContact[],
  validateForm: boolean,
  isEditing: boolean,
  clientObject: Client,
  close: () => void,
  resetFields: () => void
) {
  const { addNotification } = useNotification();
  const { createClient, updateClient, deleteClient } = useClients();

  const onSaveClient = () => {
    if (!validateForm) return;

    if (isEditing && selectedClient) {
      //   const clientToUpdate: Client = {
      //     id: selectedClient.id,
      //     name,
      //     lastName,
      //     surname,
      //     contacts: contacts.filter((contact) => contact.type !== "" || contact.value !== ""),
      //     createdAt: selectedClient.createdAt || new Date().toISOString(),
      //     updatedAt: new Date().toISOString(),
      //   };

      updateClient(clientObject)
        .then(() => {
          // console.log("Клиент обновлен успешно:", updatedClient);
          addNotification("success", `Клиент ${clientObject.name} обновлен успешно`, 5000);
          close();
          resetFields();
        })
        .catch((error: Error) => {
          console.error("Ошибка при обновлении клиента:", error);
          addNotification("error", "Ошибка обновления клиента", 5000);
        });
    } else {
      //   const newClient: Omit<Client, "id"> = {
      //     name,
      //     lastName,
      //     surname,
      //     contacts: contacts.filter((contact) => contact.type !== "" || contact.value !== ""),
      //     createdAt: new Date().toISOString(),
      //     updatedAt: new Date().toISOString(),
      //   };
      createClient(clientObject)
        .then(() => {
          console.log("Клиент создан успешно:", clientObject);
          addNotification("success", "Клиент создан успешно", 5000);
          close();
          resetFields();
        })
        .catch((error: Error) => {
          console.error("Ошибка при создании клиента:", error);
        });
    }
  };

  const onDeleteClient = () => {
    if (selectedClient) {
      deleteClient(selectedClient.id)
        .then(() => {
          addNotification("success", "Клиент удален успешно", 5000);
          close();
          resetFields();
          console.log("Клиент удален:", selectedClient.id);
        })
        .catch((error: Error) => {
          console.error("Ошибка при удалении клиента:", error);
        });
    }
  };

  const onCloseModal = () => {
    close();
    setTimeout(() => {
      resetFields();
    }, 500);
  };

  return {
    onSaveClient,
    onDeleteClient,
    onCloseModal,
  };
}
