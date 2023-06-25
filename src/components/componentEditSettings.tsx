import {
  DtoComponentItem,
  DtoVersionItem,
  Settings,
  SettingsUtils,
  VersionUtils,
} from "@/types/types";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Copy, MoreVerticalIcon, Plus, Save, Trash } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { InputWithLabel } from "./inputs/inputWithLabel";
import { InputSelection } from "./inputs/inputSelection";
import TooltipButton from "./ui/tooltipButton";
import { Input } from "./ui/input";

interface ComponentCardSettingsProps {
  component: DtoComponentItem;
  versions?: DtoVersionItem[];
  settings: Settings;
  settingsUtils: SettingsUtils;
  versionUtils: VersionUtils;
}

export default function ComponentEditSettings({
  component,
  versions,
  settings,
  settingsUtils,
  versionUtils,
}: ComponentCardSettingsProps) {
  const [newVersionNumber, setNewVersionNumber] = useState(0);

  const versionsProprities = versions?.map((version) => ({
    label: String(version.version),
    value: String(version.id),
  }));

  return (
    <div className="flex flex-col gap-y-2 p-2">
      {/* input to change component name */}
      <InputWithLabel
        placeholder="Component Name"
        type="text"
        label="Component Name"
        value={component.name}
        onChange={(e) => { }}
        onBlur={(e) => { }}
      />

      {/* input to select component version or create new version */}
      <InputSelection
        label="Selected Version"
        value={String(settings.selectedVersion)}
        onValueChange={(value) => {
          settingsUtils.setSelectedVersion(parseInt(value));
        }}
        proprities={versionsProprities || []}
      />

      {/* buttons to delete, save, create or duplicate component */}
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-2">
          {/* button to duplicate component */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full">
                <Copy />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">
                    Duplicate Version
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Set a new version number.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Number</Label>
                    <Input
                      id="number"
                      className="col-span-2 h-8"
                      type="number"
                      value={newVersionNumber}
                      onChange={(e) => {
                        setNewVersionNumber(parseInt(e.target.value));
                      }}
                    />
                  </div>
                  <div className="flex w-full justify-end mt-4">
                    <Button
                      onClick={() => {
                        versionUtils.addVersion(newVersionNumber, true);
                      }}
                    >
                      Duplicate Version
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {/* button to create new version */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full">
                <Plus />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Create Version</h4>
                  <p className="text-sm text-muted-foreground">
                    Set a new version number.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Number</Label>
                    <Input
                      id="number"
                      className="col-span-2 h-8"
                      type="number"
                      value={newVersionNumber}
                      onChange={(e) => {
                        setNewVersionNumber(parseInt(e.target.value));
                      }}
                    />
                  </div>
                  <div className="flex w-full justify-end mt-4">
                    <Button
                      onClick={() => {
                        versionUtils.addVersion(newVersionNumber);
                      }}
                    >
                      Create Version
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center gap-x-2">
          {/* button to delete component */}
          <TooltipButton
            variant="destructive"
            tooltipText="Delete Current Version"
            onClick={() => {
              versionUtils.deleteVersion();
            }}
            className="w-full"
          >
            <Trash />
          </TooltipButton>
          {/* button to save component */}
          <TooltipButton
            tooltipText="Save Current Version"
            className="w-full"
            onClick={() => {
              versionUtils.updateVersionData();
            }}
          >
            <Save />
          </TooltipButton>
        </div>
      </div>
    </div>
  );
}
