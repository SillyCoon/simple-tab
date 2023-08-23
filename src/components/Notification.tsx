import type { ParsingError as NotificationType } from "../notifier/notifier";
import { RiSystemErrorWarningLine } from "solid-icons/ri";

interface NotificationItemProps {
  notification: NotificationType;
}

export const Notification = (props: NotificationItemProps) => {
  const notificationClasses =
    props.notification.type === "error"
      ? "bg-red-200 text-red-800"
      : "bg-yellow-200 text-yellow-800";

  return (
    <div
      class={`w-full inline-flex items-center p-2 mb-2 rounded-md shadow-md ${notificationClasses}`}
    >
      <RiSystemErrorWarningLine></RiSystemErrorWarningLine>
      <span class="ml-2">{props.notification.message}</span>:
      <span class="ml-2">{props.notification.value}</span>
    </div>
  );
};
