import { useCallback, useEffect, useState } from "react";

import { Client, ClientContact } from "@entities/client";
// import { Client, ClientContact, createClient, deleteClient, updateClient } from "@entities/client";
import { useNotification } from "@shared/hooks/useNotification";

// export interface ClientContactExtended extends ClientContact {
//   isNew: boolean;
// }
export interface UseModalFormProps {
  isOpen: boolean;
  isEditing: boolean;
  isDelete: boolean;
  client: Client | null;
  close: () => void;
  createClient: (c: Omit<Client, "id">) => Promise<void>;
  updateClient: (c: Client) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
}

export const useModalForm = ({
  isOpen,
  isEditing,
  client: selectedClient,
  close,
  createClient,
  updateClient,
  deleteClient,
}: UseModalFormProps) => {
  const { addNotification } = useNotification();

  // Локальные состояния формы
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [contacts, setContacts] = useState<ClientContactExtended[]>([]);
  const [errorsValidate, setErrorsValidate] = useState<{ [key: string]: string }>({});
  const [validationError, setValidationError] = useState<string>("");
  const [validationAttempt, setValidationAttempt] = useState<number>(0);
  // const [isHovered, setIsHovered] = useState<boolean>(false);

  /**
   * Инициализация состояний формы при открытии модального окна
   * Если редактируем клиента и клиент существует, заполняем поля формы
   */
  useEffect(() => {
    if (isOpen && isEditing && selectedClient) {
      setLastName(selectedClient.lastName);
      setName(selectedClient.name);
      setSurname(selectedClient.surname);
      setContacts(
        selectedClient.contacts.map((contact: ClientContact) => ({
          ...contact,
          isNew: false,
        }))
      );
    }
  }, [isOpen, isEditing, selectedClient]);

  /**
   * Добавление нового пустого контакта в список
   */
  const addContactForm = useCallback(() => {
    setContacts((prevForms) => [...prevForms, { type: "", value: "", isNew: true }]);
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    const onlyLetters = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const multipleSpaces = /\s{2,}/; // два и более пробела подряд
    const noSpacesAllowed = /^\S+$/; // нет пробелов

    const nameTrimmed = name.trim();
    const lastNameTrimmed = lastName.trim();
    const surnameTrimmed = surname.trim();

    if (!nameTrimmed) {
      newErrors["name"] = "Поле 'Имя' не может быть пустым";
      isValid = false;
    } else if (!onlyLetters.test(nameTrimmed)) {
      newErrors["name"] = "Поле 'Имя' может содержать только буквы и один пробел";
      isValid = false;
    } else if (multipleSpaces.test(nameTrimmed)) {
      newErrors["name"] = "Поле 'Имя' не может содержать несколько подряд идущих пробелов";
      isValid = false;
    }

    if (!lastNameTrimmed) {
      newErrors["lastName"] = "Поле 'Фамилия' не может быть пустым";
      isValid = false;
    } else if (!onlyLetters.test(lastNameTrimmed)) {
      newErrors["lastName"] = "Поле 'Фамилия' может содержать только буквы и один пробел";
      isValid = false;
    } else if (multipleSpaces.test(lastNameTrimmed)) {
      newErrors["lastName"] = "Поле 'Фамилия' не может содержать несколько подряд идущих пробелов";
      isValid = false;
    }

    if (!surnameTrimmed) {
      newErrors["surname"] = "Поле 'Отчество' не может быть пустым";
      isValid = false;
    } else if (!onlyLetters.test(surnameTrimmed)) {
      newErrors["surname"] = "Поле 'Отчество' может содержать только буквы";
      isValid = false;
    } else if (!noSpacesAllowed.test(surnameTrimmed)) {
      newErrors["surname"] = "Поле 'Отчество' не должно содержать пробелов";
      isValid = false;
    }

    contacts.forEach((contact, index) => {
      if (!contact.value.trim()) {
        newErrors[`contact_${index}`] = "Поле контакта не может быть пустым";
        isValid = false;
      }

      if (contact.type === "Email" && !emailRegex.test(contact.value)) {
        newErrors[`contact_${index}`] = "Введите корректный email";
        isValid = false;
      }

      if (["Телефон", "Доп. телефон"].includes(contact.type)) {
        // Убираем из строки всё, кроме цифр
        const phoneDigits = contact.value.replace(/\D/g, "");
        // Проверяем, что номер начинается с 7 и состоит ровно из 11 цифр
        if (!/^7\d{10}$/.test(phoneDigits)) {
          newErrors[`contact_${index}`] = "Введите корректный номер телефона";
          isValid = false;
        }
      }
    });

    setErrorsValidate(newErrors);
    setValidationError(Object.values(newErrors).join("\n"));

    setValidationAttempt((prev) => prev + 1);
    return isValid;
  };

  // const clientInfo = useMemo(() => {
  //   const now = new Date().toISOString();
  //   return {
  //     id: selectedClient?.id || 0,
  //     name,
  //     lastName,
  //     surname,
  //     createdAt: selectedClient?.createdAt || now,
  //     updatedAt: now,
  //     contacts: contacts.filter((contact) => contact.type !== "" || contact.value !== ""),
  //   };
  // }, [selectedClient, name, lastName, surname, contacts]);

  const handleSave = () => {
    if (!validateForm()) return;

    if (isEditing && selectedClient) {
      // Редактирование существующего клиента

      const clientToUpdate: Client = {
        id: selectedClient.id,
        name,
        lastName,
        surname,
        contacts: contacts.filter((contact) => contact.type !== "" || contact.value !== ""),
        createdAt: selectedClient.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      updateClient(clientToUpdate)
        .then(() => {
          // console.log("Клиент обновлен успешно:", updatedClient);
          addNotification("success", `Клиент ${clientToUpdate.name} обновлен успешно`, 5000);
          close();
          resetFields();
        })
        .catch((error: Error) => {
          console.error("Ошибка при обновлении клиента:", error);
          addNotification("error", "Ошибка обновления клиента", 5000);
        });
    } else {
      const newClient: Omit<Client, "id"> = {
        name,
        lastName,
        surname,
        contacts: contacts.filter((contact) => contact.type !== "" || contact.value !== ""),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      createClient(newClient)
        .then(() => {
          console.log("Клиент создан успешно:", newClient);
          addNotification("success", "Клиент создан успешно", 5000);
          close();
          resetFields();
        })
        .catch((error: Error) => {
          console.error("Ошибка при создании клиента:", error);
        });
    }
  };

  const handleDelete = () => {
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

  const handleClose = () => {
    close();
    setTimeout(() => {
      resetFields();
    }, 500);
  };

  const resetFields = () => {
    setLastName("");
    setName("");
    setSurname("");
    setContacts([]);
    setErrorsValidate({});
    setValidationError("");
  };

  const handleContactTypeChange = useCallback((index: number, value: string) => {
    setContacts((prevForms) => {
      const updateForms = [...prevForms];
      if (updateForms[index]) {
        updateForms[index].type = value;
      }
      return updateForms;
    });
  }, []);

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
    setErrorsValidate((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[`contact_${index}`];
      setValidationError(Object.values(newErrors).join("\n")); // обновляем validationError
      return newErrors;
    });
  };

  return {
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
    resetFields,
    handleContactTypeChange,
    handleContactValueChange,
    handleDeleteContact,
  };
};
