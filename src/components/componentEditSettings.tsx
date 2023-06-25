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
  const [saveOtion, setSaveOption] = useState({
    newVersion: false,
    versionNumber: 0,
    versionId: 0,
  });

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
          <TooltipButton
            tooltipText="Duplicate Current Version"
            className="w-full"
            onClick={() => { }}
          >
            <Copy />
          </TooltipButton>
          {/* button to create new version */}
          <TooltipButton
            tooltipText="Create New Version"
            className="w-full"
            onClick={() => { }}
          >
            <Plus />
          </TooltipButton>
        </div>
        <div className="flex items-center gap-x-2">
          {/* button to delete component */}
          <TooltipButton
            variant="destructive"
            tooltipText="Delete Current Version"
            onClick={() => { }}
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

      <Popover>
        <PopoverTrigger asChild>
          <MoreVerticalIcon className="w-6 h-6" />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-y-2 p-2">
            <Dialog>
              <DialogTrigger>
                <Button className="w-full">Save</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save version</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="version-mode"
                      checked={saveOtion.newVersion}
                      onCheckedChange={(checked) => {
                        setSaveOption({ ...saveOtion, newVersion: checked });
                      }}
                    />
                    <Label htmlFor="version-mode">Save As New Version</Label>
                  </div>
                  {saveOtion.newVersion ? (
                    <InputWithLabel
                      placeholder="Version Number"
                      label="Version Number"
                      type="number"
                      value={saveOtion.versionNumber}
                      onChange={(e) => {
                        setSaveOption({
                          ...saveOtion,
                          versionNumber: parseInt(e.target.value),
                        });
                      }}
                    />
                  ) : (
                    <InputSelection
                      label="Version"
                      value={
                        String(saveOtion.versionId) || String(versions?.[0].id)
                      }
                      onValueChange={(value) => {
                        setSaveOption({
                          ...saveOtion,
                          versionId: value,
                        });
                      }}
                      proprities={
                        versions?.map((version) => ({
                          label: String(version.version),
                          value: String(version.id),
                        })) || []
                      }
                    />
                  )}
                </div>
                <DialogFooter>
                  <DialogClose asChild>role=button</DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
