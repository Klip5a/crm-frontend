export const formatDateTime = (dateTime: string): { date: string; time: string } => {
  const dateObj = new Date(dateTime);
  const formattedDate = dateObj.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  const formattedTime = dateObj.toLocaleTimeString("ru-RU", {
    hour: "numeric",
    minute: "numeric",
  });
  return { date: formattedDate, time: formattedTime };
};
