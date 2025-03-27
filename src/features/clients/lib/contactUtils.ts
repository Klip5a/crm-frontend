// contactUtils.ts
export const formatContactValue = (type: string, value: string) => {
  // Приводим тип к нижнему регистру и заменяем все пробельные символы на пробел для сравнения
  const normalizedType = type.toLowerCase().replace(/\s/g, " ");
  // Определяем, что это телефон (учитываем "Телефон" и "Доп. телефон")
  const isPhone = normalizedType.includes("телефон");

  // Тип c неразрывными пробелами (актуально для Email, Facebook, VK и т. д.)
  const formattedType = type.replace(/ /g, "\u00A0");

  // Для телефона при необходимости можно дополнительно менять пробелы на неразрывные
  let formattedValue = value;
  if (isPhone) {
    // Заменяем обычные пробелы на неразрывные
    formattedValue = value.replace(/ /g, "\u00A0");
  }

  return {
    isPhone,
    formattedType,
    formattedValue,
  };
};
