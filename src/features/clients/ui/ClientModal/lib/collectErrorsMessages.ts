import { FieldError, FieldErrors } from "react-hook-form";

import { ClientFormValues } from "@entities/client/schema";

export function collectErrorMessages(errors: FieldErrors<ClientFormValues>): string[] {
  if (!errors || typeof errors !== "object") return [];

  let messages: string[] = [];

  for (const key in errors) {
    if (!Object.prototype.hasOwnProperty.call(errors, key)) continue;

    const error = errors[key as keyof typeof errors];

    console.log(error);

    if (Array.isArray(error)) {
      error.forEach((item) => {
        if (item && typeof item === "object") {
          if ("value" in item && item.value?.message) {
            messages.push(item.value.message);
            console.log(messages);
          } else {
            messages = messages.concat(collectErrorMessages(item));
            console.log(messages);
          }
        }
      });
    } else if (error && typeof error === "object") {
      if ("message" in error && error.message) {
        messages.push(error.message);
        console.log(messages);
      } else {
        messages = messages.concat(collectErrorMessages(error as FieldError));
      }
    }
  }
  console.log(messages);

  return messages;
}
