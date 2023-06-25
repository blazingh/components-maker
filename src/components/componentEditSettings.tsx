import {
  DtoComponentItem,
  DtoVersionItem,
  Settings,
  SettingsUtils,
} from "@/types/types";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { MoreVerticalIcon } from "lucide-react";
import { Button } from "./ui/button";

interface ComponentCardSettingsProps {
  component: DtoComponentItem;
  versions?: DtoVersionItem[];
  settings: Settings;
  settingsUtils: SettingsUtils;
}

export default function ComponentEditSettings({
  component,
  versions,
  settings,
  settingsUtils,
}: ComponentCardSettingsProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MoreVerticalIcon className="w-6 h-6" />
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-y-2 p-2">
          <Button onClick={() => settingsUtils.saveSelectedVersion()}>
            Save
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
