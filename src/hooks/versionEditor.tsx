"use client";

import { useToast } from "@/components/ui/use-toast";
import { initialVersionData } from "@/constants/version";
import {
  BlockContentType,
  BlocksTree,
  ButtonBlockItem,
  ButtonUtils,
  ComponentUtils,
  ContainerBlockItem,
  ContainerUtils,
  DtoComponentItem,
  DtoVersionItem,
  ImageBlockItem,
  ImageUtils,
  Locales,
  Settings,
  SettingsUtils,
  TextBlockItem,
  TextBlockType,
  TextBlockWrapper,
  TextUtils,
  VersionUtils,
} from "@/types/types";
import { useEffect, useState } from "react";
import useAuthProvider from "./authProvider";
import { UsePocketBase } from "./pocketbase";

interface VersionEditorProps {
  _component: DtoComponentItem;
  _componentVersions: DtoVersionItem[];
}

interface VersionEditorReturn {
  blocks: BlocksTree;
  ContainerUtils: ContainerUtils;
  TextUtils: TextUtils;
  buttonUtils: ButtonUtils;
  imageUtils: ImageUtils;
  componentUtils: ComponentUtils;
  versionUtils: VersionUtils;
  settings: Settings;
  settingsUtils: SettingsUtils;
  component: DtoComponentItem;
  componentVersions: DtoVersionItem[];
  selectedVersion: DtoVersionItem;
}

export default function VersionEditor({
  _component,
  _componentVersions,
}: VersionEditorProps): VersionEditorReturn {
  const { toast } = useToast();

  const { user } = useAuthProvider();

  const { pb } = UsePocketBase();

  const [component, setComponet] = useState<DtoComponentItem>(_component);

  const [componentVersions, setBlockVersions] = useState<DtoVersionItem[]>(
    _componentVersions || []
  );

  const [selectedVersion, setSelectedVersion] = useState<DtoVersionItem>(
    _componentVersions[0]
  );

  const [blocks, setBlocks] = useState<BlocksTree>(
    (selectedVersion?.data as BlocksTree) || initialVersionData
  );

  const [settings, setSettings] = useState<Settings>({
    showOutline: true,
    activeBlockId: Object.keys(componentVersions[0].data)[0],
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
    setBlocks(selectedVersion.data as BlocksTree);
  }, [selectedVersion]);

  const componentUtils: ComponentUtils = {
    renameComponent: async (name: string) => {
      pb.update("components", component.id, { name }, "Component renamed");
    },
  };

  const versionUtils: VersionUtils = {
    addVersion: async (versionName: string, duplicate?: boolean) => {
      let copyVersion: DtoVersionItem | undefined;

      if (duplicate)
        copyVersion = componentVersions.find(
          (v) => v.id === settings.selectedVersion
        ) as DtoVersionItem;

      const creationData = {
        component: component.id,
        version_name: versionName,
        data: copyVersion ? copyVersion.data : initialVersionData,
      };

      const res = await pb.create<DtoVersionItem>(
        "versions",
        creationData,
        "Version has been created"
      );

      if (!res) return;
      setBlockVersions([...componentVersions, res]);
      setSettings({ ...settings, selectedVersion: res.id });
    },

    deleteVersion: async () => {
      const res = await pb.delete<DtoVersionItem>(
        "versions",
        settings.selectedVersion,
        "Version has been deleted"
      );

      if (!res) return;
      const newBlockVersions = componentVersions.filter(
        (v) => v.id !== settings.selectedVersion
      );
      setBlockVersions(newBlockVersions);
      setSettings({
        ...settings,
        selectedVersion: newBlockVersions[0].id,
      });
    },

    updateVersionNumber: async (versionNumber: number) => {
      const updationData = {
        number: versionNumber,
      };

      const res = await pb.update<DtoVersionItem>(
        "versions",
        settings.selectedVersion,
        updationData,
        "Version number has been updated"
      );

      if (!res) return;
      setBlockVersions(
        componentVersions.map((v) => {
          if (v.id === settings.selectedVersion) return res;
          else return v;
        })
      );
    },

    updateVersionName: async (versionName: string) => {
      const updationData = {
        version_name: versionName,
      };

      const res = await pb.update<DtoVersionItem>(
        "versions",
        settings.selectedVersion,
        updationData,
        "Version name has been updated"
      );

      if (!res) return;
      setBlockVersions(
        componentVersions.map((v) => {
          if (v.id === settings.selectedVersion) return res;
          else return v;
        })
      );
    },

    updateVersionData: async () => {
      const updationData = {
        data: blocks,
      };

      const res = await pb.update<DtoVersionItem>(
        "versions",
        settings.selectedVersion,
        updationData,
        "Version data has been updated"
      );

      if (!res) return;
      setBlockVersions(
        componentVersions.map((v) => {
          if (v.id === settings.selectedVersion) return res;
          else return v;
        })
      );
    },
  };

  const settingsUtils: SettingsUtils = {
    toggleOutline: (value?: boolean) => {
      if (value !== undefined) setSettings({ ...settings, showOutline: value });
      else setSettings({ ...settings, showOutline: !settings.showOutline });
    },
    setActiveBlockId: (id: string) => {
      setSettings({ ...settings, activeBlockId: id });
    },
    setSelectedVersion: (id: string) => {
      const version = componentVersions.find(
        (v) => v.id === id
      ) as DtoVersionItem;
      setSettings({
        ...settings,
        selectedVersion: id,
        activeBlockId: Object.keys(version.data)[0],
      });
    },
  };

  const ContainerUtils: ContainerUtils = {
    // Function to add a container component
    add: (parentId: string) => {
      const newBlock: ContainerBlockItem = {
        id: String(Math.random()),
        name: "New Container",
        type: BlockContentType.Container,
        style: {},
        children: [],
        parent: parentId,
      };

      const parent = blocks[parentId] as ContainerBlockItem;

      // update the components
      parent.children.push(newBlock.id);

      // update the state
      setBlocks({
        ...blocks,
        [newBlock.id]: newBlock,
        [parentId]: parent,
      });
    },

    // Function to remove a container component
    remove: (id: string) => {
      const component = blocks[id] as ContainerBlockItem;
      // Delete children recursively
      for (const child of component.children) {
        if (blocks[child].type === BlockContentType.Container)
          ContainerUtils.remove(child);
      }

      const parent = blocks[component.parent] as ContainerBlockItem;

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
    updateName: (name: string) => {
      blocks[settings.activeBlockId].name = name;
      setBlocks({ ...blocks });
    },

    // function to update the style of a container component
    updateStyle: (attr: string, value: any) => {
      blocks[settings.activeBlockId].style = {
        ...blocks[settings.activeBlockId].style,
        [attr]: value,
      };
      setBlocks({ ...blocks });
    },

    // Function to change a child's position in the children array
    changeChildPosition: (id: string, delta: number) => {
      const parent = blocks[blocks[id].parent] as ContainerBlockItem;
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
      const parent = blocks[blocks[id].parent] as ContainerBlockItem;

      // Delete the component from its parent's children array
      const index = parent.children.indexOf(id);
      parent.children.splice(index, 1);

      // Update the state
      setBlocks({ ...blocks, [parent.id]: parent });
    },
  };

  const TextUtils: TextUtils = {
    // Function to add a text component
    add: (parentId: string) => {
      const newBlock: TextBlockItem = {
        id: String(Math.random()),
        name: "New Text",
        type: BlockContentType.Text,
        text: "New Text",
        textType: TextBlockType.Text,
        wrapper: TextBlockWrapper.P,
        style: {},
        parent: parentId,
        localizedText: {},
      };

      const parent = blocks[parentId] as ContainerBlockItem;

      // update the components
      parent.children.push(newBlock.id);

      // update the state
      setBlocks({
        ...blocks,
        [newBlock.id]: newBlock,
        [parentId]: parent,
      });
    },

    // Function to remove a text component
    remove: () => {
      // Delete the component from its parent's children array
      ContainerUtils.removeChild(settings.activeBlockId);

      // Delete the component from the components object
      delete blocks[settings.activeBlockId];

      // Update the state
      setBlocks({ ...blocks });
    },

    // Function to update the name of a text component
    updateName: (name: string) => {
      blocks[settings.activeBlockId].name = name;
      setBlocks({ ...blocks });
    },

    // function to update the style of a text component
    updateStyle: (attr: string, value: any) => {
      blocks[settings.activeBlockId].style = {
        ...blocks[settings.activeBlockId].style,
        [attr]: value,
      };
      setBlocks({ ...blocks });
    },

    // Function to update the text of a text component
    updateContent: (text: string) => {
      const block = blocks[settings.activeBlockId] as TextBlockItem;
      block.text = text;

      // Update the state
      setBlocks({ ...blocks, [settings.activeBlockId]: block });
    },

    // Function to update the wrapper of a text component
    updateWrapper: (wrapper: TextBlockWrapper) => {
      const block = blocks[settings.activeBlockId] as TextBlockItem;
      block.wrapper = wrapper;

      // Update the state
      setBlocks({ ...blocks, [settings.activeBlockId]: block });
    },

    // Function to update the type of a text component
    updateType: (type: TextBlockType) => {
      const block = blocks[settings.activeBlockId] as TextBlockItem;
      block.textType = type;

      // Update the state
      setBlocks({ ...blocks, [settings.activeBlockId]: block });
    },

    // function to add localized text
    addLocalized: (locale: Locales) => {
      const block = blocks[settings.activeBlockId] as TextBlockItem;

      if (!block.localizedText) block.localizedText = {};

      // check if the locale already exists
      if (block.localizedText[locale]) return;

      block.localizedText[locale] = "";

      // Update the state
      setBlocks({ ...blocks, [settings.activeBlockId]: block });
    },

    // function to remove localized text
    removeLocalized: (locale: Locales) => {
      const block = blocks[settings.activeBlockId] as TextBlockItem;
      // check if the locale exists
      if (!block.localizedText) return;

      delete block.localizedText[locale];

      // Update the state
      setBlocks({ ...blocks, [settings.activeBlockId]: block });
    },

    // function to update localized text
    updateLocalizedContent: (locale: Locales, text: string) => {
      const block = blocks[settings.activeBlockId] as TextBlockItem;
      // check if the locale exists
      if (!block.localizedText) return;

      block.localizedText[locale] = text;

      // Update the state
      setBlocks({ ...blocks, [settings.activeBlockId]: block });
    },
  };

  const buttonUtils: ButtonUtils = {
    // Function to add a button component
    add: (parentId: string) => {
      const newBlock: ButtonBlockItem = {
        id: String(Math.random()),
        name: "New Button",
        type: BlockContentType.Button,
        text: "New Button",
        style: {},
        parent: parentId,
        onClickFunctionKey: "",
      };

      const parent = blocks[parentId] as ContainerBlockItem;

      // update the components
      parent.children.push(newBlock.id);

      // update the state
      setBlocks({
        ...blocks,
        [newBlock.id]: newBlock,
        [parentId]: parent,
      });
    },

    // Function to remove a button component
    remove: () => {
      // Delete the component from its parent's children array
      ContainerUtils.removeChild(settings.activeBlockId);

      // Delete the component from the components object
      delete blocks[settings.activeBlockId];

      // Update the state
      setBlocks({ ...blocks });
    },

    // Function to update the name of a button component
    updateName: (name: string) => {
      blocks[settings.activeBlockId].name = name;
      setBlocks({ ...blocks });
    },

    // function to update the style of a button component
    updateStyle: (attr: string, value: any) => {
      blocks[settings.activeBlockId].style = {
        ...blocks[settings.activeBlockId].style,
        [attr]: value,
      };
      setBlocks({ ...blocks });
    },

    // Function to update the text of a button component
    updateText: (text: string) => {
      const block = blocks[settings.activeBlockId] as ButtonBlockItem;
      block.text = text;

      // Update the state
      setBlocks({ ...blocks, [settings.activeBlockId]: block });
    },

    // Function to update the onClickFunctionKey of a button component
    updateOnClickFunctionKey: (onClickFunctionKey: string) => {
      const block = blocks[settings.activeBlockId] as ButtonBlockItem;
      block.onClickFunctionKey = onClickFunctionKey;

      // Update the state
      setBlocks({ ...blocks, [settings.activeBlockId]: block });
    },
  };

  const imageUtils: ImageUtils = {
    // Function to add an image component
    add: (parentId: string) => {
      const newBlock: ImageBlockItem = {
        id: String(Math.random()),
        name: "New Image",
        type: BlockContentType.Image,
        src: "",
        style: {},
        parent: parentId,
        alt: "",
        width: 100,
        height: 100,
      };

      const parent = blocks[parentId] as ContainerBlockItem;

      // update the components
      parent.children.push(newBlock.id);

      // update the state

      setBlocks({
        ...blocks,
        [newBlock.id]: newBlock,
        [parentId]: parent,
      });
    },

    // Function to remove an image component
    remove: () => {
      // Delete the component from its parent's children array
      ContainerUtils.removeChild(settings.activeBlockId);

      // Delete the component from the components object
      delete blocks[settings.activeBlockId];

      // Update the state
      setBlocks({ ...blocks });
    },

    // Function to update the name of an image component
    updateName: (name: string) => {
      blocks[settings.activeBlockId].name = name;
      setBlocks({ ...blocks });
    },

    // function to update the style of an image component
    updateStyle: (attr: string, value: any) => {
      blocks[settings.activeBlockId].style = {
        ...blocks[settings.activeBlockId].style,
        [attr]: value,
      };
      setBlocks({ ...blocks });
    },

    // Function to update the src of an image component
    updateSrc: (src: string) => {
      const block = blocks[settings.activeBlockId] as ImageBlockItem;
      block.src = src;

      // Update the state
      setBlocks({ ...blocks, [settings.activeBlockId]: block });
    },

    // Function to update the alt of an image component
    updateAlt: (alt: string) => {
      const block = blocks[settings.activeBlockId] as ImageBlockItem;
      block.alt = alt;

      // Update the state
      setBlocks({ ...blocks, [settings.activeBlockId]: block });
    },
  };
  return {
    blocks,
    ContainerUtils,
    TextUtils,
    componentUtils,
    buttonUtils,
    imageUtils,
    selectedVersion,
    versionUtils,
    settings,
    settingsUtils,
    component,
    componentVersions,
  };
}
