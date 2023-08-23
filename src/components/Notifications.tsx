import { For } from "solid-js";
import { ParsingError } from "../notifier/notifier";
import { Notification } from "./Notification";

export const Notifications = (props: { errors: ParsingError[] }) => {
  return (
    <div class="">
      <div class="space-y-2">
        <For each={props.errors}>
          {(error) => <Notification notification={error} />}
        </For>
        {/* <For each={props.notifications.warnings}>
          {(warning) => <Notification notification={warning} />}
        </For> */}
      </div>
    </div>
  );
};
