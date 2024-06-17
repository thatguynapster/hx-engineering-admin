import { Switch } from "@headlessui/react";
import { classNames } from "@/libs";

export function Toggle({
  enabled,
  setEnabled,
  title,
}: {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
  title: string;
}) {
  return (
    <Switch.Group as="div" className="flex items-center py-2.5 px-3.5">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? "bg-primary" : "bg-neutral-40",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3 text-sm">
        <span className="font-medium">{title}</span>
      </Switch.Label>
    </Switch.Group>
  );
}
