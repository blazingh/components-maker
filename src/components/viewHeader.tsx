import { Settings, SettingsUtils } from "@/app/edit/page";
import { SettingsIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

interface ViewHeaderProps {
  settings: Settings;
  settingsUtils: SettingsUtils;
}

export default function ViewHeader({
  settings,
  settingsUtils,
}: ViewHeaderProps) {
  return (
    <div className="flex justify-between items-center w-full px-4 py-2 bg-zinc-800">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SettingsIcon size={24} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="shadow-lg rounded-md p-2 w-56">
          <div className="grid gap-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="show-outline"
                checked={settings.showOutline}
                onCheckedChange={(value) => {
                  settingsUtils.toggleOutline(value as boolean);
                }}
              />
              <Label htmlFor="show-outline">Show outline</Label>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
