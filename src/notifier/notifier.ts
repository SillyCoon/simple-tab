export interface BaseNotification {
  message: string;
  value: string;
}

export interface Notification {
  message: string;
  value: string;
  type: "error" | "warning";
}

interface NotificationError extends Notification {
  type: "error";
}

interface NotificationWarning extends Notification {
  type: "warning";
}

export interface Notifications {
  errors: NotificationError[];
  warnings: NotificationWarning[];
}

