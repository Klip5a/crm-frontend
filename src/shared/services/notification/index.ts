import { Notification, NotificationType } from "./type";

class NotificationService {
  private static instance: NotificationService;
  private notifications: Notification[] = [];
  private listeners: ((notifications: Notification[]) => void)[] = [];

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private constructor() {}

  public subscribe(callback: (notifications: Notification[]) => void) {
    this.listeners.push(callback);
  }

  public unsubscribe(callback: (notification: Notification[]) => void) {
    this.listeners = this.listeners.filter((listener) => listener !== callback);
  }

  public notify() {
    this.listeners.forEach((listener) => listener(this.notifications));
  }

  public addNotification(type: NotificationType, message: string, duration?: number) {
    const newNotification = {
      id: Date.now(),
      type,
      message,
      duration,
    };

    this.notifications.push(newNotification);
    this.notify();
    return newNotification.id;
  }

  public removeNotification(id: number) {
    this.notifications = this.notifications.filter((notification) => notification.id !== id);
    this.notify();
  }

  public getNotifications() {
    return this.notifications;
  }
}

export default NotificationService.getInstance();
