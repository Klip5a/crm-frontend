import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import NotificationItem from "./NotificationItem";

import notificationService from "../../services/notification";
import { Notification } from "../../services/notification/type";

const NotificationContainer: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(
    notificationService.getNotifications()
  );

  useEffect(() => {
    const listener = (notifs: Notification[]) => {
      setNotifications([...notifs]);
    };
    notificationService.subscribe(listener);
    return () => notificationService.unsubscribe(listener);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50">
      <AnimatePresence>
        {notifications.map((notif) => (
          <NotificationItem key={notif.id} notification={notif} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationContainer;
