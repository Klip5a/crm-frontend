import { format } from "@react-input/mask";
import { useEffect, useMemo } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import { isPhoneType, maskOptions } from "../utils/contactUtils";

export function useContactFormLogic(index: number) {
  const { control, setValue } = useFormContext();
  const type = useWatch({ control, name: `contacts.${index}.type` });
  const value = useWatch({ control, name: `contacts.${index}.value` });

  // Форматирование только для телефонов
  const formattedValue = useMemo(() => {
    if (isPhoneType(type) && value) {
      const clean = value.replace(/\D/g, "");
      return format(clean, maskOptions);
    }
    return value ?? "";
  }, [type, value]);

  // Сброс значения при смене типа, если value невалидно
  useEffect(() => {
    if (isPhoneType(type) && value && !/^\d{10,}$/.test(value.replace(/\D/g, ""))) {
      setValue(`contacts.${index}.value`, "");
    }
  }, [type]);

  return {
    type,
    formattedValue,
  };
}
