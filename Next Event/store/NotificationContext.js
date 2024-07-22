import { createContext, useEffect, useState } from "react";

const NotificationContext = createContext({
  notification: null,
  showNotification: (notification) => {},
  hideNotification: () => {},
});

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  // MARK: 调用Notification
  // TODO: 在需要添加Notification的地方写showNotification
  // TODO: 并且传入notification对象，包含3个内容 title，message，status
  // TODO: const { title, message, status } = props;
  
  const showNotification = (notification) => {
    setNotification(notification);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  // MARK: - 3s自动隐藏
  useEffect(() => {
    if (notification && notification.status !== "pending") {
      const timer = setTimeout(() => {
        hideNotification();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification]);

  const values = {
    notification,
    showNotification,
    hideNotification,
  };
  return (
    <NotificationContext.Provider value={values}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
