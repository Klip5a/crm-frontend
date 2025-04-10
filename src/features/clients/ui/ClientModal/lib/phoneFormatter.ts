/**
 *
 * @property formatted - отформатированная строка с номером телефона.
 * @property newCaretPosition - новая позиция курсора после форматирования.
 */
export interface FormatPhoneResult {
  formatted: string;
  newCaretPosition: number;
}

// Константы форматирования
const COUNTRY_PREFIX = "+7";
const OPEN_PART = " (";
const CLOSE_PART = ") ";
const DASH = "-";

/**
 * Формирует отформатированную строку телефонного номера по шаблону:
 * +7 (XXX) XXX-XX-XX
 *
 * @param localDigits строка, содержащая локальные цифры (без кода страны)
 * @returns объект с отформатированной строкой и длиной закрывающей части,которая используется при расчёте позиции курсора.
 *
 */
const buildFormattedNumber = (
  localDigits: string,
  closePartLength: number
): { formatted: string; closePartLength: number } => {
  const parts: string[] = [COUNTRY_PREFIX];

  if (localDigits.length > 0) {
    // Добавляем открывающую часть и первые 3 цифры
    parts.push(OPEN_PART, localDigits.slice(0, 3));

    // Если введено больше 3 цифр, добавляем закрывающую часть, которая будет видна в формате
    if (closePartLength) parts.push(CLOSE_PART);

    // Добавляем вторую группу: следующие до 3 цифр (цифры с 4-й по 6-ю позицию)
    parts.push(localDigits.slice(3, 6));

    // Если есть больше 6 цифр, добавляем тире и третью группу (2 цифры)
    if (localDigits.length > 6) parts.push(DASH, localDigits.slice(6, 8));

    // Если есть больше 8 цифр, добавляем тире и четвёртую группу (2 цифры)
    if (localDigits.length > 8) parts.push(DASH, localDigits.slice(8, 10));
  }
  return { formatted: parts.join(""), closePartLength };
};

/**
 * Вычисляет позицию курсора в отформатированной строке.
 *
 * @param effectiveLocalIndex индекс цифры в локальной части (без кода страны), учитывающий количество введённых цифр до курсора.
 * @param localDigits строка, содержащая локальные цифры номера (без кода страны)
 * @returns позицию курсора в итоговой отформатированной строке
 */
const calculateCaretPosition = (effectiveLocalIndex: number, closePartLength: number): number => {
  // Базовая длина: код страны "+7" + открывающая часть " ("
  const prefixLength = COUNTRY_PREFIX.length + OPEN_PART.length;
  const firstBlockMax = 3;

  if (effectiveLocalIndex <= 0)
    // Если цифр ещё нет – позиция курсора сразу после открывающей скобки.
    return prefixLength;

  if (effectiveLocalIndex <= firstBlockMax)
    // Если цифры попадают в первую группу, смещаем курсор на количество введённых цифр.
    return prefixLength + effectiveLocalIndex;

  if (effectiveLocalIndex <= 6)
    // Если цифры во второй группе, добавляем:
    // - базовую длину первой группы (firstBlockMax)
    // - длину закрывающей части (closePartLength)
    // - количество цифр, введённых во второй группе.
    return prefixLength + firstBlockMax + closePartLength + (effectiveLocalIndex - firstBlockMax);

  if (effectiveLocalIndex <= 8)
    // Если цифры попадают в третью группу, добавляем:
    // - базовую длину (prefixLength)
    // - 3 цифры первой группы
    // - закрывающую часть (closePartLength)
    // - 3 цифры второй группы
    // - тире перед третьей группой (DASH.length)
    // - количество цифр, введённых в третьей группе.
    return (
      prefixLength + firstBlockMax + closePartLength + 3 + DASH.length + (effectiveLocalIndex - 6)
    );
  // Если цифры попадают в четвёртую группу, добавляем:
  // - базовую длину (prefixLength)
  // - 3 цифры первой группы
  // - закрывающую часть (closePartLength)
  // - 3 цифры второй группы
  // - тире перед третьей группой (DASH.length)
  // - 2 цифры третьей группы
  // - тире перед четвёртой группой (DASH.length)
  // - количество цифр, введённых в четвёртой группе.
  return (
    prefixLength +
    firstBlockMax +
    closePartLength +
    3 +
    DASH.length +
    2 +
    DASH.length +
    (effectiveLocalIndex - 8)
  );
};

/**
 * Форматирует номер телефона и рассчитывает новую позицию курсора.
 *
 * @param value исходное значение, введённое пользователем (может содержать не только цифры)
 * @param caretPosition текущая позиция курсора в исходном значении
 * @returns объект с отформатированным номером телефона и новой позицией курсора
 */
export const formatPhoneNumber = (value: string, caretPosition: number): FormatPhoneResult => {
  // Извлекаем все цифры из исходного значения
  let rawDigits = value.replace(/\D/g, "");
  if (!rawDigits) return { formatted: "", newCaretPosition: 0 };

  // Определяем количество цифр до текущей позиции курсора.
  // Это нужно, чтобы сохранить относительное положение курсора при добавлении форматирующих символов.
  const digitsBeforeCaret = (value.slice(0, caretPosition).match(/\d/g) || []).length;

  // Если первая цифра не "7" или "8", считаем, что пользователь ввёл локальный номер без кода страны,
  // поэтому автоматически добавляем "7". Если начинается с "8", заменяем её на "7".
  const originalDigits = value.replace(/\D/g, "");
  if (originalDigits[0] !== "7" && originalDigits[0] !== "8") {
    rawDigits = "7" + rawDigits;
  } else if (rawDigits.startsWith("8")) {
    // Если начинается с 8, заменяем на 7
    rawDigits = "7" + rawDigits.slice(1);
  }

  // Ограничиваем общее количество цифр до 11 (код страны + 10 цифр локального номера)
  rawDigits = rawDigits.slice(0, 11);

  // Выделяем локальную часть номера (все цифры после кода страны)
  const localDigits = rawDigits.slice(1);

  // Вычисляем длину закрывающей части один раз
  const closePartLength = localDigits.length > 3 ? CLOSE_PART.length : 0;

  // Если код страны был введён пользователем (начинается с "7" или "8"),
  // то уменьшаем количество на 1, чтобы не учитывать его в позиционировании.
  const effectiveLocalIndex =
    originalDigits[0] === "7" || originalDigits[0] === "8"
      ? Math.max(digitsBeforeCaret - 1, 0)
      : digitsBeforeCaret;

  // Формируем отформатированную строку по шаблону с помощью вспомогательной функции.
  // Результат будет вида: +7 (XXX) XXX-XX-
  const { formatted } = buildFormattedNumber(localDigits, closePartLength);

  // Рассчитываем новую позицию курсора в отформатированной строке.
  // Функция calculateCaretPosition учитывает добавленные символы форматирования,
  // чтобы курсор оставался на ожидаемой позиции относительно введённых цифр.
  let newCaretPosition = calculateCaretPosition(effectiveLocalIndex, closePartLength);

  // Гарантируем, что позиция курсора не выйдет за пределы строки.
  newCaretPosition = Math.min(newCaretPosition, formatted.length);

  // Возвращаем отформатированную строку и новую позицию курсора.
  return { formatted, newCaretPosition };
};
