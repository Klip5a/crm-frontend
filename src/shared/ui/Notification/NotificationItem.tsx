import { motion } from "framer-motion";
import { useEffect } from "react";

import notificationService from "../../services/notification";
import { Notification } from "../../services/notification/type";

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  useEffect(() => {
    if (notification.duration) {
      const timer = setTimeout(() => {
        notificationService.removeNotification(notification.id);
      }, notification.duration);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`relative pb-4 mb-2 rounded shadow overflow-hidden
            ${notification.type === "success" ? "bg-green-200 " : ""}
            ${notification.type === "error" ? "bg-red-200" : ""}
            ${notification.type === "warning" ? "bg-yellow-200" : ""}
            ${notification.type === "info" ? "bg-info-200" : ""}
        `}
      onClick={() => notificationService.removeNotification(notification.id)}
    >
      {notification.message}
      {notification.duration ? (
        <div
          className="animate-progress h-1.5 bg-green absolute bottom-0 left-0"
          style={{
            animationDuration: `${notification.duration}ms`,
            width: "100%",
          }}
        />
      ) : null}
    </motion.div>
  );
};

export default NotificationItem;
