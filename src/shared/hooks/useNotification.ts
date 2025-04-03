import notificationService from "../services/notification";
import { NotificationType } from "../services/notification/type";

export const useNotification = () => {
  const addNotification = (type: NotificationType, message: string, duration?: number) => {
    return notificationService.addNotification(type, message, duration);
  };

  const removeNotification = (id: number) => {
    notificationService.removeNotification(id);
  };

  return { addNotification, removeNotification };
};
