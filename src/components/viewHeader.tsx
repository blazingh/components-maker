import { Settings, SettingsUtils } from "@/types/types";
import { BoneIcon, SettingsIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { Button } from "./ui/button";

interface ViewHeaderProps {
  settings: Settings;
  settingsUtils: SettingsUtils;
}

export default function ViewHeader({
  settings,
  settingsUtils,
}: ViewHeaderProps) {
  return (
    <div className="flex justify-between items-center w-full h-full  px-4 py-2 bg-zinc-800 relative shadow-md">
      {/* logo */}
      <div className="flex items-center space-x-2 animate-hue-rotate relative">
        <Image
          src="/logo2.png"
          alt="logo"
          className="absolute top-0 left-0 blur-xl"
          width={42}
          height={42}
        />
        <Image src="/logo2.png" alt="logo" width={36} height={36} />
        <div className="text-zinc-300 text-xl font-semibold">NACG</div>
      </div>

      {/* title */}
      <div className="text-zinc-300 text-xl font-semibold absolute left-1/2 transform -translate-x-1/2">
        Not Another CSS Generator
      </div>

      {/* settings */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <BoneIcon size={36} className="text-zinc-300 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="shadow-lg rounded-md p-4 w-80 flex flex-col gap-4 mx-2">
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
          <Separator />
          <Button onClick={() => { }}>Save Component</Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
