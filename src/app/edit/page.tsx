"use client";
import * as React from "react";

import { ComponentsFileTree } from "@/components/componentsFileTree";
import ComponentsPreviewTree from "@/components/componentsPreviewTree";
import { initialComponents } from "@/initialTestComponents";
import ComponentsEditBar from "@/components/componentsEditBar";
import {
  ComponentContentType,
  ComponentTextType,
  ComponentTextWrapper,
  ComponentsTree,
  ContainerComponentItem,
  ContainerUtils,
  Locales,
  Settings,
  SettingsUtils,
  TextComponentItem,
  TextUtils,
} from "@/types/types";
import ViewHeader from "@/components/viewHeader";

export default function Demo() {
  // Define state for components and activeId
  const [components, setComponents] =
    React.useState<ComponentsTree>(initialComponents);
  const [activeId, setActiveId] = React.useState<string>("1");

  const [settings, setSettings] = React.useState<Settings>({
    showOutline: true,
  });

  const settingsUtils: SettingsUtils = {
    toggleOutline: (value?: boolean) => {
      if (value !== undefined) setSettings({ ...settings, showOutline: value });
      else setSettings({ ...settings, showOutline: !settings.showOutline });
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

      const parent = components[parentId] as ContainerComponentItem;

      // update the components
      parent.children.push(newComponent.id);

      // update the state
      setComponents({
        ...components,
        [newComponent.id]: newComponent,
        [parentId]: parent,
      });
    },

    // Function to remove a container component
    removeContainer: (id: string) => {
      const component = components[id] as ContainerComponentItem;
      // Delete children recursively
      for (const child of component.children) {
        if (components[child].type === ComponentContentType.Container)
          ContainerUtils.removeContainer(child);
      }

      const parent = components[component.parent] as ContainerComponentItem;

      // Delete the component from its parent's children array
      const index = parent.children.indexOf(id);
      parent.children.splice(index, 1);

      // Delete the component from the components object
      delete components[id];

      // Update the state
      setComponents({ ...components, [parent.id]: parent });
    },

    // Function to update the name of a container component
    updateContainerName: (id: string, name: string) => {
      components[id].name = name;
      setComponents({ ...components });
    },

    // function to update the style of a container component
    updateContainerStyle: (id: string, attr: string, value: any) => {
      components[id].style = { ...components[id].style, [attr]: value };
      setComponents({ ...components });
    },

    // Function to change a child's position in the children array
    changeChildPosition: (id: string, delta: number) => {
      const parent = components[
        components[id].parent
      ] as ContainerComponentItem;
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
      setComponents({ ...components, [parent.id]: parent });
    },

    // Function to remove a child from a container children array
    removeChild: (id: string) => {
      const parent = components[
        components[id].parent
      ] as ContainerComponentItem;

      // Delete the component from its parent's children array
      const index = parent.children.indexOf(id);
      parent.children.splice(index, 1);

      setComponents({ ...components, [parent.id]: parent });
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

      const parent = components[parentId] as ContainerComponentItem;

      // update the components
      parent.children.push(newComponent.id);

      // update the state
      setComponents({
        ...components,
        [newComponent.id]: newComponent,
        [parentId]: parent,
      });
    },

    // Function to remove a text component
    removeText: (id: string) => {
      // Delete the component from its parent's children array
      ContainerUtils.removeChild(id);

      // Delete the component from the components object
      delete components[id];

      // Update the state
      setComponents({ ...components });
    },

    // Function to update the name of a text component
    updateTextName: (id: string, name: string) => {
      components[id].name = name;
      setComponents({ ...components });
    },

    // function to update the style of a text component
    updateTextStyle: (id: string, attr: string, value: any) => {
      components[id].style = { ...components[id].style, [attr]: value };
      setComponents({ ...components });
    },

    // Function to update the text of a text component
    updateTextContent: (id: string, text: string) => {
      const component = components[id] as TextComponentItem;
      component.text = text;

      // Update the state
      setComponents({ ...components, [id]: component });
    },

    // Function to update the wrapper of a text component
    updateTextWrapper: (id: string, wrapper: ComponentTextWrapper) => {
      const component = components[id] as TextComponentItem;
      component.wrapper = wrapper;

      // Update the state
      setComponents({ ...components, [id]: component });
    },

    // Function to update the type of a text component
    updateTextType: (id: string, type: ComponentTextType) => {
      const component = components[id] as TextComponentItem;
      component.textType = type;

      // Update the state
      setComponents({ ...components, [id]: component });
    },

    // function to add localized text
    addLocalizedText: (id: string, locale: Locales) => {
      const component = components[id] as TextComponentItem;

      if (!component.localizedText) component.localizedText = {};

      // check if the locale already exists
      if (component.localizedText?.[locale]) return;

      component.localizedText[locale] = "";

      // Update the state
      setComponents({ ...components, [id]: component });
    },

    // function to remove localized text
    removeLocalizedText: (id: string, locale: Locales) => {
      const component = components[id] as TextComponentItem;
      // check if the locale exists
      if (!component.localizedText) return;

      delete component.localizedText[locale];

      // Update the state
      setComponents({ ...components, [id]: component });
    },

    // function to update localized text
    updateLocalizedTextContent: (id: string, locale: Locales, text: string) => {
      const component = components[id] as TextComponentItem;
      // check if the locale exists
      if (!component.localizedText) return;

      component.localizedText[locale] = text;

      // Update the state
      setComponents({ ...components, [id]: component });
    },
  };

  return (
    <div className="flex flex-col w-full h-screen ">
      <div className="w-full h-14 ">
        <ViewHeader settings={settings} settingsUtils={settingsUtils} />
      </div>
      <div className="flex w-full h-full">
        <div className="flex flex-col bg-zinc-800 pt-4 w-52">
          <ComponentsFileTree
            components={components}
            id={"1"}
            activeId={activeId}
            setActiveId={setActiveId}
          />
        </div>

        <div className="w-full flex items-center justify-center p-6 bg-zinc-900">
          <ComponentsPreviewTree
            showOutline={settings.showOutline}
            components={components}
            id={"1"}
            activeId={activeId}
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
          className="flex flex-col p-2 bg-zinc-800 gap-y-2 overflow-y-scroll align-center w-60 h-full"
          style={{ maxHeight: "calc(100vh - 3.5rem)" }}
        >
          <ComponentsEditBar
            components={components}
            selectedComponent={components[activeId]}
            activeId={activeId}
            containerUtils={ContainerUtils}
            textUtils={TextUtils}
          />
        </div>
      </div>
    </div>
  );
}
