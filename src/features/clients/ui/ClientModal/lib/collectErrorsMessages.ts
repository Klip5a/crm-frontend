import { FieldError, FieldErrors } from "react-hook-form";

import { ClientFormValues } from "@entities/client/schema";

export function collectErrorMessages(errors: FieldErrors<ClientFormValues>): string[] {
  if (!errors || typeof errors !== "object") return [];

  let messages: string[] = [];

  for (const key in errors) {
    if (!Object.prototype.hasOwnProperty.call(errors, key)) continue;

    const error = errors[key as keyof typeof errors];

    if (Array.isArray(error)) {
      error.forEach((item) => {
        if (item && typeof item === "object") {
          if ("value" in item && item.value?.message) {
            messages.push(item.value.message);
          } else {
            messages = messages.concat(collectErrorMessages(item));
          }
        }
      });
    } else if (error && typeof error === "object") {
      if ("message" in error && error.message) {
        messages.push(error.message);
      } else {
        messages = messages.concat(collectErrorMessages(error as FieldError));
      }
    }
  }

  return messages;
}
