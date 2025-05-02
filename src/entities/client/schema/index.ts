import { z } from "zod";

export type ClientFormValues = {
  name: string;
  lastName: string;
  surname: string;
  contacts: { id: string; type: string; value: string }[];
};

export const contactSchema = z
  .object({
    id: z.string(),
    type: z.string().min(1, "Выберите тип контакта"),
    value: z.string().min(1, "Поле контакта не может быть пустым"),
  })
  .superRefine((data, ctx) => {
    if (data.type === "Email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.value)) {
        ctx.addIssue({
          path: ["value"],
          code: z.ZodIssueCode.custom,
          message: "Введите корректный email",
        });
      }
    }

    // if (["Телефон", "Доп. телефон"].includes(data.type)) {
    //   const phoneDigits = data.value.replace(/\D/g, "");
    //   if (!/^7\d{10}$/.test(phoneDigits)) {
    //     ctx.addIssue({
    //       path: ["value"],
    //       code: z.ZodIssueCode.custom,
    //       message: "Введите корректный номер телефона",
    //     });
    //   }
    // }
  });

export const clientFormSchema = z.object({
  lastName: z
    .string()
    .min(1, "Поле 'Фамилия' не может быть пустым")
    .regex(/^[a-zA-Zа-яА-ЯёЁ\s-]+$/, "Только буквы и пробел")
    .refine((val) => !/\s{2,}/.test(val), "Два и более пробела подряд недопустимы"),
  name: z
    .string()
    .min(1, "Поле 'Имя' не может быть пустым")
    .regex(/^[a-zA-Zа-яА-ЯёЁ\s-]+$/, "Только буквы и пробел")
    .refine((val) => !/\s{2,}/.test(val), "Два и более пробела подряд недопустимы"),
  surname: z
    .string()
    .min(1, "Поле 'Отчество' не может быть пустым")
    .regex(/^[a-zA-Zа-яА-ЯёЁ-]+$/, "Только буквы")
    .refine((val) => /^\S+$/.test(val), "Не должно содержать пробелов"),
  contacts: z.array(contactSchema),
});
