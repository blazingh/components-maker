"use client";
import VersionEditor from "@/hooks/versionEditor";
import { DtoComponentItem, DtoVersionItem } from "@/types/types";
import { BlocksFileTree } from "./componentsFileTree";
import ComponentsPreviewTree from "./componentsPreviewTree";
import ComponentsEditBar from "./componentsEditBar";
import ComponentEditSettings from "./componentEditSettings";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import useAuthProvider from "@/hooks/authProvider";

interface ComponentEditPageProps {
  _component: DtoComponentItem;
  _componentVersions: DtoVersionItem[];
}

export default function ComponentEditPage({
  _component,
  _componentVersions,
}: ComponentEditPageProps) {
  const { user } = useAuthProvider();

  const {
    blocks,
    ContainerUtils,
    component,
    componentVersions,
    TextUtils,
    imageUtils,
    buttonUtils,
    settings,
    settingsUtils,
    versionUtils,
    componentUtils,
    selectedVersion,
  } = VersionEditor({
    _component: _component,
    _componentVersions: _componentVersions,
  });

  if (!user) return null;

  return (
    <div className="flex w-full h-full">
      <div
        className="flex flex-col bg-zinc-800 w-80"
        style={{ height: "calc(100vh - 3.5rem)" }}
      >
        <ComponentEditSettings
          selectedVersion={selectedVersion}
          component={component}
          versions={componentVersions}
          settings={settings}
          settingsUtils={settingsUtils}
          versionUtils={versionUtils}
          componentUtils={componentUtils}
        />
        <Label className="p-2">Component Blocks Tree</Label>
        <div className="flex flex-col h-full overflow-y-scroll">
          <BlocksFileTree
            blocks={blocks}
            id={"1"}
            activeBlockId={settings.activeBlockId}
            setActiveBlockId={settingsUtils.setActiveBlockId}
          />
        </div>
      </div>

      <div className="w-full flex items-center justify-center p-6 bg-zinc-900">
        <ComponentsPreviewTree
          showOutline={settings.showOutline}
          blocks={blocks}
          id={"1"}
          activeBlockId={settings.activeBlockId}
          data={{
            user_name: "John Doe",
            locale: "en",
            random: "random tect",
            rando: "randttttom tect",
            rand: "randoct",
          }}
        />
      </div>

      <div
        className="flex flex-col p-2 bg-zinc-800 gap-y-2 overflow-y-scroll align-center w-80 h-full"
        style={{ height: "calc(100vh - 3.5rem)" }}
      >
        <ComponentsEditBar
          blocks={blocks}
          activeBlockId={settings.activeBlockId}
          containerUtils={ContainerUtils}
          textUtils={TextUtils}
          imageUtils={imageUtils}
          buttonUtils={buttonUtils}
        />
      </div>
    </div>
  );
}
