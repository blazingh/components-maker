import {
  ComponentUtils,
  DtoComponentItem,
  DtoVersionItem,
  Settings,
  SettingsUtils,
  VersionUtils,
} from "@/types/types";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ArrowDown, ChevronDown, Copy, Pen, Plus, Save, Settings2, SettingsIcon, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Label } from "./ui/label";
import { InputWithLabel } from "./inputs/inputWithLabel";
import { InputSelection } from "./inputs/inputSelection";
import TooltipButton from "./ui/tooltipButton";
import { Input } from "./ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { PopoverClose } from "@radix-ui/react-popover";
import { Accordion } from "./ui/accordion";

interface ComponentCardSettingsProps {
  component: DtoComponentItem;
  versions?: DtoVersionItem[];
  settings: Settings;
  settingsUtils: SettingsUtils;
  versionUtils: VersionUtils;
  componentUtils: ComponentUtils;
  selectedVersion: DtoVersionItem;
}

export default function ComponentEditSettings({
  component,
  versions,
  settings,
  settingsUtils,
  versionUtils,
  componentUtils,
  selectedVersion,
}: ComponentCardSettingsProps) {
  const [newVersionName, setNewVersionName] = useState("");

  const [newComponentName, setNewComponentName] = useState(component.name);

  const [optionsOpen, setOptionsOpen] = useState(false);

  const versionsProprities = versions?.map((version) => ({
    label: version.version_name,
    value: String(version.id),
  }));

  return (
    <div className="flex flex-col gap-y-2 p-2">
      {/* input to change component name */}
      <InputWithLabel
        placeholder="Component Name"
        type="text"
        label="Component Name"
        value={newComponentName}
        onChange={(e) => {
          setNewComponentName(e.target.value);
        }}
        onBlur={(e) => {
          componentUtils.renameComponent(e.target.value);
        }}
      />

      <div className="flex flex-row gap-x-2 items-end">
        {/* input to select component version or create new version */}
        <InputSelection
          label="Selected Version"
          value={String(settings.selectedVersion)}
          onValueChange={(value) => {
            settingsUtils.setSelectedVersion(parseInt(value));
          }}
          proprities={versionsProprities || []}
        />
        <Button
          variant={optionsOpen ? "default" : "outline"}
          onClick={() => {
            setOptionsOpen(!optionsOpen);
          }}
          className="p-2"
        >
          <Settings2 className="w-5 h-5" />
        </Button>
      </div>

      {/* buttons to delete, save, create or duplicate component */}
      <div className={`flex flex-col gap-y-2 ${optionsOpen ? "" : "hidden"}`}>
        <div className="flex items-center gap-x-2">
          {/* button to duplicate component */}
          <Popover
            onOpenChange={(isOpen) => {
              if (isOpen) setNewVersionName(selectedVersion.version_name);
            }}
          >
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
                    Set a new version name.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Name</Label>
                    <Input
                      id="number"
                      className="col-span-2 h-8"
                      value={newVersionName}
                      onChange={(e) => {
                        setNewVersionName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex w-full justify-end mt-4">
                    <PopoverClose>
                      <Button
                        onClick={() => {
                          versionUtils.addVersion(newVersionName, true);
                        }}
                      >
                        Duplicate Version
                      </Button>
                    </PopoverClose>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {/* button to edit version */}
          <Popover
            onOpenChange={(isOpen) => {
              if (isOpen) setNewVersionName(selectedVersion.version_name);
            }}
          >
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full">
                <Pen />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Edit Version</h4>
                  <p className="text-sm text-muted-foreground">
                    Set a new version name.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Name</Label>
                    <Input
                      id="number"
                      className="col-span-2 h-8"
                      value={newVersionName}
                      onChange={(e) => {
                        setNewVersionName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex w-full justify-end mt-4">
                    <PopoverClose>
                      <Button
                        onClick={() => {
                          versionUtils.updateVersionName(newVersionName);
                        }}
                      >
                        Edit Version
                      </Button>
                    </PopoverClose>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* button to create new version */}
          <Popover
            onOpenChange={(isOpen) => {
              if (isOpen) setNewVersionName("");
            }}
          >
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
                    Set a new version name.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Name</Label>
                    <Input
                      id="number"
                      className="col-span-2 h-8"
                      value={newVersionName}
                      onChange={(e) => {
                        setNewVersionName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex w-full justify-end mt-4">
                    <PopoverClose>
                      <Button
                        onClick={() => {
                          versionUtils.addVersion(newVersionName);
                        }}
                      >
                        Create Version
                      </Button>
                    </PopoverClose>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center gap-x-2">
          {/* button with dialog to delete component */}
          <AlertDialog>
            <AlertDialogTrigger asChild className="w-full">
              <Button
                variant="destructive"
                onClick={() => { }}
                className="w-full"
              >
                <Trash />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  selected version.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      versionUtils.deleteVersion();
                    }}
                  >
                    Delete Version
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
