import { useState } from "react";

import { ClientContactExtended } from "./useModalForm";

export function useFormValidation(
  name: string,
  lastName: string,
  surname: string,
  contacts: ClientContactExtended[]
) {
  const [errorsValidate, setErrorsValidate] = useState<{ [key: string]: string }>({});
  const [validationError, setValidationError] = useState<string>("");
  const [validationAttempt, setValidationAttempt] = useState<number>(0);

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

  const clearValidateError = (index: string) => {
    setErrorsValidate((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[`contact_${index}`];
      setValidationError(Object.values(newErrors).join("\n")); // обновляем validationError
      return newErrors;
    });
  };

  return {
    errorsValidate,
    validationError,
    validationAttempt,
    validateForm,
    clearValidateError,
  };
}
