import {
  ComponentContentType,
  ComponentItem,
  ComponentsTree,
} from "@/types/types";
import React, { Component, useState } from "react";
import { PropritySelector } from "../componentsEditBar";
import TooltipButton from "../ui/tooltipButton";
import { PlusIcon } from "lucide-react";

const proprities = (): { label: string; value: string }[] => {
  const proprities: { label: string; value: string }[] = [];
  for (const key in ComponentContentType) {
    if (isNaN(Number(key))) {
      proprities.push({ label: key, value: key });
    }
  }
  return proprities;
};

interface ContentProps {
  components: ComponentsTree;
  selectedComponent?: ComponentItem;
  addComponent: (parent: string, type: ComponentContentType) => void;
  deleteComponent: (component: string) => void;
}

export function Content({
  components,
  selectedComponent,
  addComponent,
  deleteComponent,
}: ContentProps) {
  const [selectedType, setSelectedType] =
    React.useState<ComponentContentType>();

  if (!selectedComponent) {
    return <div>select a component</div>;
  }

  return (
    <div className="flex flex-col w-full h-full">
      {/* list all the children of the selected component */}
      {selectedComponent.children.map((child) => {
        const component = components[child.id];
        return (
          <div key={component.id} className="w-full h-8">
            <div>{component.name}</div>
            <div>{component.type}</div>
          </div>
        );
      })}
      {/* add a new component */}
      <PropritySelector
        label="Add a new component"
        value=""
        onValueChange={(value) => {
          setSelectedType(value as ComponentContentType);
        }}
        proprities={proprities()}
      />
      <TooltipButton
        onClick={() => {
          if (selectedType) {
            addComponent(selectedComponent.id, selectedType);
          }
        }}
        tooltipText="add a new child component to the selected component"
      >
        <PlusIcon className="mr-2 h-4 w-4" />
        add component
      </TooltipButton>
    </div>
  );
}
