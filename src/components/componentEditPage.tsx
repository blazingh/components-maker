"use client";
import VersionEditor from "@/hooks/versionEditor";
import { DtoComponentItem, DtoVersionItem } from "@/types/types";
import { useState } from "react";
import { ComponentsFileTree } from "./componentsFileTree";
import ComponentsPreviewTree from "./componentsPreviewTree";
import ComponentsEditBar from "./componentsEditBar";
import ComponentEditSettings from "./componentEditSettings";

interface ComponentEditPageProps {
  _component: DtoComponentItem;
  _componentVersions: DtoVersionItem[];
}

export default function ComponentEditPage({
  _component,
  _componentVersions,
}: ComponentEditPageProps) {
  const {
    blocks,
    ContainerUtils,
    component,
    componentVersions,
    TextUtils,
    settings,
    settingsUtils,
    versionUtils,
  } = VersionEditor({
    _component: _component,
    _componentVersions: _componentVersions,
  });

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col bg-zinc-800 w-80">
        <ComponentEditSettings
          component={component}
          versions={componentVersions}
          settings={settings}
          settingsUtils={settingsUtils}
          versionUtils={versionUtils}
        />
        <ComponentsFileTree
          components={blocks}
          id={"1"}
          activeId={settings.activeId}
          setActiveId={settingsUtils.setActiveId}
        />
      </div>

      <div className="w-full flex items-center justify-center p-6 bg-zinc-900">
        <ComponentsPreviewTree
          showOutline={settings.showOutline}
          components={blocks}
          id={"1"}
          activeId={settings.activeId}
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
          components={blocks}
          activeId={settings.activeId}
          containerUtils={ContainerUtils}
          textUtils={TextUtils}
        />
      </div>
    </div>
  );
}
