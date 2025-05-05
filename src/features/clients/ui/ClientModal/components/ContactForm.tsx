import { InputMask } from "@react-input/mask";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import { useShake } from "@shared/hooks/useShake";

import CustomSelect from "./CustomSelect";
import { DeleteIcon } from "./DeleteIcon";

const CONTACT_TYPES = ["Телефон", "Доп. телефон", "Email", "VK", "Facebook", "Другое"] as const;
// const PHONE_TYPES = ["Телефон", "Доп. телефон"] as const;

const COMMON_INPUT_CLASSES =
  "block w-full pl-3 text-sm font-semibold bg-[#f4f3f6] border-solid border-x-[1px] border-grey focus:outline-none";

// const isPhoneType = (type: string) => PHONE_TYPES.includes(type as (typeof PHONE_TYPES)[number]);

// const isPhoneType = (type: string | undefined) => {
//   console.log("Проверка типа:", type);
//   console.log("Это телефон?", type && PHONE_TYPES.includes(type as (typeof PHONE_TYPES)[number]));
//   return type && PHONE_TYPES.includes(type as (typeof PHONE_TYPES)[number]);
// };

interface ContactFormProps {
  field: { id: string; type: string; value: string };
  index: number;
  errorMessage?: string;
  validationAttempt: number;
  remove: (idx: number) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  field,
  index,
  errorMessage,
  validationAttempt,
  remove,
}) => {
  const { control, register } = useFormContext();

  const [isPhone, setIsPhone] = useState(() => {
    // Инициализируем состояние на основе начального значения field.type
    return field.type === "Телефон" || field.type === "Доп. телефон";
  });

  const type = useWatch({
    control,
    name: `contacts.${index}.type`,
    defaultValue: field.type,
  });

  // Обновляем isPhone при изменении типа
  useEffect(() => {
    const phoneCheck = type === "Телефон" || type === "Доп. телефон";
    // console.log(`Тип изменился на ${type} для индекса ${index}, isPhone: ${phoneCheck}`);
    setIsPhone(phoneCheck);
  }, [type, index]);

  // const debugContact = {
  //   index,
  //   type,

  //   // contact,
  //   field,
  //   isPhone,
  // };
  // console.log(`contact:${index}`, debugContact);

  const isShaking = useShake(!!errorMessage, validationAttempt);

  // useEffect(() => {
  //   console.log("Contacts после изменения:", field);
  //   console.log(`Компонент смонтирован с типом: ${type} для индекса ${index}`);
  //   console.log(isPhone);
  // }, [field]);

  const containerClassName = useMemo(() => {
    const baseClass =
      "flex border-solid border-[1px] transform transition-all duration-300 ease-in-out opacity-100 translate-y-0 relative";
    const borderClass = errorMessage ? "border-red" : "border-grey";
    const animationClass = isShaking ? "shake" : "";
    return `${baseClass} ${borderClass} ${animationClass}`;
  }, [errorMessage, isShaking]);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ position: "relative", zIndex: 10 - index }}
      className="px-6 pt-[15px]"
    >
      <div className={containerClassName}>
        <input type="hidden" {...register(`contacts.${index}.id`)} defaultValue={field.id} />
        <Controller
          control={control}
          name={`contacts.${index}.type`}
          render={({ field }) => (
            <CustomSelect
              value={field.value}
              options={CONTACT_TYPES}
              onChange={field.onChange}
              disabled={false}
            />
          )}
        />
        <Controller
          control={control}
          name={`contacts.${index}.value`}
          render={({ field }) => {
            // console.log(`Рендер поля value для ${index}. isPhone:`, isPhone);

            if (isPhone) {
              return (
                <InputMask
                  className={COMMON_INPUT_CLASSES}
                  mask="+7 (___) ___-__-__"
                  replacement={{ _: /\d/ }}
                  value={field.value || ""}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  placeholder="+7 (123) 456-78-90"
                />
              );
            }

            return (
              <input
                {...field}
                className={COMMON_INPUT_CLASSES}
                type="text"
                placeholder={"Введите данные контакта"}
              />
            );
          }}
        />
        <button
          type="button"
          onClick={() => {
            // console.log("Удаляем контакт с индексом:", index);
            // console.log("Контакты до удаления:", field);
            remove(index);
          }}
          className="button-deleteContact relative flex justify-center items-center w-[42px] focus:outline-none after:absolute after:border-none after:border-[1px] hover:after:w-[calc(100%+2px)] hover:after:h-[calc(100%+2px)] hover:after:border-solid hover:after:border-red transition-all duration-200"
        >
          <DeleteIcon />
        </button>
      </div>
    </motion.div>
  );
};

export default ContactForm;
