import { For } from "solid-js";
import { Notifications as NotificationsType } from "../notifier/notifier";
import { Notification } from "./Notification";

export const Notifications = (props: { notifications: NotificationsType }) => {
  return (
    <div class="">
      <div class="space-y-2">
        <For each={props.notifications.errors}>
          {(error) => <Notification notification={error} />}
        </For>
        <For each={props.notifications.warnings}>
          {(warning) => <Notification notification={warning} />}
        </For>
      </div>
    </div>
  );
};
