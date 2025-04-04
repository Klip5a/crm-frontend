import { useCallback, useEffect, useMemo, useState } from "react";

import {
  ClientContact,
  createClient,
  deleteClient,
  updateClient,
} from "../../../../entities/client";
import { useNotification } from "../../../hooks/useNotification";
import { ModalProps } from "..";

// не уверен, что это правильно, экспортировать или нет
/**
 * Расширенный тип контакта, с добавлением свойства "isNew"
 */
export interface ClientContactExtended extends ClientContact {
  isNew: boolean;
}

/**
 * Hook управления состоянием формы редактирования/создания клиента.
 *
 * @param props - Свойства модального окна (данные клиента, флаги состояния, колбэки)
 * @returns Объект с состоянием формы, функциями управления состоянием и обработчиками событий
 *
 */
export const useModalForm = (props: ModalProps) => {
  const { isOpen, isEditing, onClose, onSave, onUpdate, onDelete, clientData } = props;

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
    if (isOpen && isEditing && clientData) {
      setLastName(clientData.lastName);
      setName(clientData.name);
      setSurname(clientData.surname);
      setContacts(
        clientData.contacts.map((contact) => ({
          ...contact,
          isNew: false,
        }))
      );
    }
  }, [isOpen, isEditing, clientData]);

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

  const clientInfo = useMemo(() => {
    const now = new Date().toISOString();
    return {
      id: clientData?.id || 0,
      name,
      lastName,
      surname,
      createdAt: clientData?.createdAt || now,
      updatedAt: now,
      contacts: contacts.filter((contact) => contact.type !== "" || contact.value !== ""),
    };
  }, [clientData, name, lastName, surname, contacts]);

  const handleSave = () => {
    if (!validateForm()) return;

    if (isEditing) {
      // Редактирование существующего клиента
      updateClient(clientData?.id, clientInfo)
        .then((updateClient) => {
          // console.log("Клиент обновлен успешно:", updateClient);
          addNotification("success", `Клиент ${updateClient.name} обновлен успешно`, 5000);
          onUpdate?.(updateClient);
          onClose();
          resetFields();
        })
        .catch((error) => {
          console.error("Ошибка при обновлении клиента:", error);
          addNotification("error", "Ошибка обновления клиента", 5000);
        });
    } else {
      // Создание нового клиента
      createClient(clientInfo)
        .then((createdClient) => {
          console.log("Клиент создан успешно:", createdClient);
          addNotification("success", "Клиент создан успешно", 5000);
          onSave?.(createdClient);
          onClose();
          resetFields();
        })
        .catch((error) => {
          console.error("Ошибка при создании клиента:", error);
        });
    }
  };

  const handleDelete = () => {
    if (onDelete && clientData) {
      deleteClient(clientData.id)
        .then(() => {
          addNotification("success", "Клиент удален успешно", 5000);
          onDelete();
          onClose();
          resetFields();
          console.log("Клиент удален:", clientData.id);
        })
        .catch((error) => {
          console.error("Ошибка при удалении клиента:", error);
        });
    }
  };

  const handleClose = () => {
    onClose();
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

  // const handleMouseEnter = () => {
  //   setIsHovered(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsHovered(false);
  // };

  return {
    name,
    lastName,
    surname,
    contacts,
    errorsValidate,
    validationError,
    validationAttempt,
    // isHovered,
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
    // handleMouseEnter,
    // handleMouseLeave,
    clientInfo,
  };
};
