"use client";

import { useNotificationContext } from "context";
import { FC, useEffect, useState } from "react";
import { ToastProps } from "./index.d";

const Toast: FC<ToastProps> = () => {
  const {
    notification: { message, type = "info", delay = 4000 },
    setNotification,
  } = useNotificationContext();

  const [show, setShow] = useState(false);

  const resetNotification = () => {
    setTimeout(() => {
      setShow(false);
      setNotification({});
    }, delay);
  };

  useEffect(() => {
    if (!message) return;

    setShow(true);
    resetNotification();
  }, [message, resetNotification]);

  const icon = {
    warning: "fa-solid fa-circle-exclamation",
    error: "fa-solid fa-triangle-exclamation",
    success: "fa-solid fa-circle-check",
    info: "fa-solid fa-circle-info",
  };

  const colorType = {
    warning: "bg-yellow-100 text-yellow-700 border-yellow-300",
    error: "bg-red-100 text-red-700 border-red-300",
    success: "bg-green-100 text-green-700 border-green-300",
    info: "bg-blue-100 text-blue-700 border-blue-300",
  };

  return (
    <div
      role="notification"
      aria-live="polite"
      aria-hidden={!show}
      className={`fixed right-4 top-9 z-30 flex w-auto min-w-52 max-w-96 items-center gap-4 rounded-md border p-3 text-sm shadow-md transition-all duration-300 md:text-base ${
        colorType[type]
      } ${show ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-4 opacity-0"}`}
    >
      <i aria-label={type} className={icon[type]}></i>

      <p className="truncate">{message}</p>
    </div>
  );
};

export default Toast;
