"use client";

import { useToast } from "@/components/ui/use-toast";
import supabase from "@/lib/supabase";
import {
  ComponentContentType,
  ComponentTextType,
  ComponentTextWrapper,
  ComponentsTree,
  ContainerComponentItem,
  ContainerUtils,
  DtoComponentItem,
  DtoVersionItem,
  Locales,
  Settings,
  SettingsUtils,
  TextComponentItem,
  TextUtils,
  VersionUtils,
} from "@/types/types";
import { useEffect, useState } from "react";

interface VersionEditorProps {
  _component: DtoComponentItem;
  _componentVersions: DtoVersionItem[];
}

interface VersionEditorReturn {
  blocks: ComponentsTree;
  ContainerUtils: ContainerUtils;
  TextUtils: TextUtils;
  versionUtils: VersionUtils;
  settings: Settings;
  settingsUtils: SettingsUtils;
  component: DtoComponentItem;
  componentVersions: DtoVersionItem[];
}

export default function VersionEditor({
  _component,
  _componentVersions,
}: VersionEditorProps): VersionEditorReturn {
  const { toast } = useToast();

  const [component, setComponent] = useState<DtoComponentItem>(_component);

  const [componentVersions, setComponentVersions] =
    useState<DtoVersionItem[]>(_componentVersions);

  const [selectedVersion, setSelectedVersion] = useState<DtoVersionItem>(
    _componentVersions[0]
  );

  const [blocks, setBlocks] = useState<ComponentsTree>(
    (selectedVersion?.data as ComponentsTree) || {}
  );

  const [settings, setSettings] = useState<Settings>({
    showOutline: true,
    activeId: Object.keys(componentVersions[0].data)[0],
    selectedVersion: componentVersions[0].id,
  });

  useEffect(() => {
    setSelectedVersion(
      (componentVersions.find(
        (v) => v.id === settings.selectedVersion
      ) as DtoVersionItem) || componentVersions[0]
    );
  }, [settings.selectedVersion, componentVersions]);

  useEffect(() => {
    setBlocks(selectedVersion.data as ComponentsTree);
  }, [selectedVersion]);

  const versionUtils: VersionUtils = {
    addVersion: async (versionNumber: number, fromVersionId?: number) => {
      let copyVersion: DtoVersionItem | undefined;

      if (fromVersionId)
        copyVersion = componentVersions.find(
          (v) => v.id === fromVersionId
        ) as DtoVersionItem;

      const { data, error } = await supabase
        .from("version")
        .insert({
          component: component.id,
          number: versionNumber,
          data: copyVersion ? copyVersion.data : {},
        })
        .select();

      if (error)
        toast({
          variant: "destructive",
          description: "Error creating version",
        });
      else if (data) {
        setComponentVersions([...componentVersions, data[0]]);
        setSettings({ ...settings, selectedVersion: data[0].id });
        toast({
          description: "Version created",
        });
      }
    },

    deleteVersion: async () => {
      const { data, error } = await supabase
        .from("version")
        .delete()
        .eq("id", settings.selectedVersion)
        .select();

      if (error)
        toast({
          variant: "destructive",
          description: "Error deleting version",
        });
      else if (data) {
        const newComponentVersions = componentVersions.filter(
          (v) => v.id !== settings.selectedVersion
        );
        setComponentVersions(newComponentVersions);
        setSettings({
          ...settings,
          selectedVersion: newComponentVersions[0].id,
        });
        toast({
          description: "Version deleted",
        });
      }
    },

    updateVersionNumber: async (versionId: number, versionNumber: number) => {
      const { data, error } = await supabase
        .from("version")
        .update({ number: versionNumber })
        .eq("id", versionId)
        .select();

      if (error)
        toast({
          variant: "destructive",
          description: "Error updating version number",
        });
      else if (data) {
        setComponentVersions(
          componentVersions.map((v) => {
            if (v.id === versionId) return data[0];
            else return v;
          })
        );
        toast({
          description: "Version number updated",
        });
      }
    },

    updateVersionData: async () => {
      const { error } = await supabase
        .from("version")
        .update({ data: blocks })
        .eq("id", settings.selectedVersion);

      if (error)
        toast({
          variant: "destructive",
          description: "Error updating version data",
        });
      else {
        setComponentVersions(
          componentVersions.map((v) => {
            if (v.id === settings.selectedVersion)
              return { ...v, data: blocks };
            else return v;
          })
        );
        toast({
          description: "Version data updated",
        });
      }
    },
  };

  const settingsUtils: SettingsUtils = {
    toggleOutline: (value?: boolean) => {
      if (value !== undefined) setSettings({ ...settings, showOutline: value });
      else setSettings({ ...settings, showOutline: !settings.showOutline });
    },
    setActiveId: (id: string) => {
      setSettings({ ...settings, activeId: id });
    },
    setSelectedVersion: (id: number) => {
      const version = componentVersions.find(
        (v) => v.id === id
      ) as DtoVersionItem;
      setSettings({
        ...settings,
        selectedVersion: id,
        activeId: Object.keys(version.data)[0],
      });
    },
  };

  const ContainerUtils: ContainerUtils = {
    // Function to add a container component
    addContainer: (parentId: string) => {
      const newComponent: ContainerComponentItem = {
        id: String(Math.random()),
        name: "New Container",
        type: ComponentContentType.Container,
        style: {},
        children: [],
        parent: parentId,
      };

      const parent = blocks[parentId] as ContainerComponentItem;

      // update the components
      parent.children.push(newComponent.id);

      // update the state
      setBlocks({
        ...blocks,
        [newComponent.id]: newComponent,
        [parentId]: parent,
      });
    },

    // Function to remove a container component
    removeContainer: (id: string) => {
      const component = blocks[id] as ContainerComponentItem;
      // Delete children recursively
      for (const child of component.children) {
        if (blocks[child].type === ComponentContentType.Container)
          ContainerUtils.removeContainer(child);
      }

      const parent = blocks[component.parent] as ContainerComponentItem;

      if (!parent) return;

      // Delete the component from its parent's children array
      const index = parent.children.indexOf(id);
      parent.children.splice(index, 1);

      // Delete the component from the components object
      delete blocks[id];

      // Update the state
      setBlocks({ ...blocks, [parent.id]: parent });
    },

    // Function to update the name of a container component
    updateContainerName: (id: string, name: string) => {
      blocks[id].name = name;
      setBlocks({ ...blocks });
    },

    // function to update the style of a container component
    updateContainerStyle: (id: string, attr: string, value: any) => {
      blocks[id].style = { ...blocks[id].style, [attr]: value };
      setBlocks({ ...blocks });
    },

    // Function to change a child's position in the children array
    changeChildPosition: (id: string, delta: number) => {
      const parent = blocks[blocks[id].parent] as ContainerComponentItem;
      const index = parent.children.indexOf(id);
      const newIndex = index + delta;

      // Check if the new index is valid
      if (newIndex < 0 || newIndex >= parent.children.length) {
        return;
      }

      // Swap the child with the child in the new index
      const temp = parent.children[newIndex];
      parent.children[newIndex] = id;
      parent.children[index] = temp;

      // Update the state
      setBlocks({ ...blocks, [parent.id]: parent });
    },

    // Function to remove a child from a container children array
    removeChild: (id: string) => {
      const parent = blocks[blocks[id].parent] as ContainerComponentItem;

      // Delete the component from its parent's children array
      const index = parent.children.indexOf(id);
      parent.children.splice(index, 1);

      // Update the state
      setBlocks({ ...blocks, [parent.id]: parent });
    },
  };

  const TextUtils: TextUtils = {
    // Function to add a text component
    addText: (parentId: string) => {
      const newComponent: TextComponentItem = {
        id: String(Math.random()),
        name: "New Text",
        type: ComponentContentType.Text,
        text: "New Text",
        textType: ComponentTextType.Text,
        wrapper: ComponentTextWrapper.P,
        style: {},
        parent: parentId,
        localizedText: {},
      };

      const parent = blocks[parentId] as ContainerComponentItem;

      // update the components
      parent.children.push(newComponent.id);

      // update the state
      setBlocks({
        ...blocks,
        [newComponent.id]: newComponent,
        [parentId]: parent,
      });
    },

    // Function to remove a text component
    removeText: (id: string) => {
      // Delete the component from its parent's children array
      ContainerUtils.removeChild(id);

      // Delete the component from the components object
      delete blocks[id];

      // Update the state
      setBlocks({ ...blocks });
    },

    // Function to update the name of a text component
    updateTextName: (id: string, name: string) => {
      blocks[id].name = name;
      setBlocks({ ...blocks });
    },

    // function to update the style of a text component
    updateTextStyle: (id: string, attr: string, value: any) => {
      blocks[id].style = { ...blocks[id].style, [attr]: value };
      setBlocks({ ...blocks });
    },

    // Function to update the text of a text component
    updateTextContent: (id: string, text: string) => {
      const block = blocks[id] as TextComponentItem;
      block.text = text;

      // Update the state
      setBlocks({ ...blocks, [id]: block });
    },

    // Function to update the wrapper of a text component
    updateTextWrapper: (id: string, wrapper: ComponentTextWrapper) => {
      const block = blocks[id] as TextComponentItem;
      block.wrapper = wrapper;

      // Update the state
      setBlocks({ ...blocks, [id]: block });
    },

    // Function to update the type of a text component
    updateTextType: (id: string, type: ComponentTextType) => {
      const block = blocks[id] as TextComponentItem;
      block.textType = type;

      // Update the state
      setBlocks({ ...blocks, [id]: block });
    },

    // function to add localized text
    addLocalizedText: (id: string, locale: Locales) => {
      const block = blocks[id] as TextComponentItem;

      if (!block.localizedText) block.localizedText = {};

      // check if the locale already exists
      if (block.localizedText[locale]) return;

      block.localizedText[locale] = "";

      // Update the state
      setBlocks({ ...blocks, [id]: block });
    },

    // function to remove localized text
    removeLocalizedText: (id: string, locale: Locales) => {
      const block = blocks[id] as TextComponentItem;
      // check if the locale exists
      if (!block.localizedText) return;

      delete block.localizedText[locale];

      // Update the state
      setBlocks({ ...blocks, [id]: block });
    },

    // function to update localized text
    updateLocalizedTextContent: (id: string, locale: Locales, text: string) => {
      const block = blocks[id] as TextComponentItem;
      // check if the locale exists
      if (!block.localizedText) return;

      block.localizedText[locale] = text;

      // Update the state
      setBlocks({ ...blocks, [id]: block });
    },
  };

  return {
    blocks,
    ContainerUtils,
    TextUtils,
    versionUtils,
    settings,
    settingsUtils,
    component,
    componentVersions,
  };
}
