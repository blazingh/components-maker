import {
  ComponentContentType,
  ComponentItem,
  ComponentTextType,
  ComponentTextWrapper,
  ComponentsTree,
} from "@/types/types";
import React from "react";
import { InputWithLabel, PropritySelector } from "../componentsEditBar";
import TooltipButton from "../ui/tooltipButton";
import { PlusIcon } from "lucide-react";
import { Label } from "../ui/label";
import { ContainerUtils, TextUtils } from "@/app/edit/page";

// get proprities from ComponentContentType
const contentTypes = Object.keys(ComponentContentType).map((key) => ({
  label: key,
  value: ComponentContentType[key as keyof typeof ComponentContentType],
}));

// get texttypes from ComponentTextType
const textTypes = Object.keys(ComponentTextType).map((key) => ({
  label: key,
  value: ComponentTextType[key as keyof typeof ComponentTextType],
}));

// get text wrappers from ComponentTextWrapper
const textWrappers = Object.keys(ComponentTextWrapper).map((key) => ({
  label: key,
  value: ComponentTextWrapper[key as keyof typeof ComponentTextWrapper],
}));

interface ContentProps {
  components: ComponentsTree;
  selectedComponent?: ComponentItem;
  textUtils: TextUtils;
  addComponent: (parent: string, type: ComponentContentType) => void;
}

export function Content({
  components,
  selectedComponent,
  textUtils,
  addComponent,
}: ContentProps) {
  const [selectedType, setSelectedType] = React.useState<ComponentContentType>(
    contentTypes[0].value
  );

  if (!selectedComponent) {
    return <div>select a component</div>;
  }

  // if the selected component is a text component
  if (selectedComponent.type === ComponentContentType.Text) {
    return (
      <div className="flex flex-col w-full h-full gap-y-2">
        {/* input to change the text wrappers of a component */}
        <PropritySelector
          label="Text Wrapper"
          value={selectedComponent?.wrapper || textWrappers[0].value}
          onValueChange={(e: ComponentTextWrapper) =>
            textUtils.updateTextWrapper(selectedComponent.id, e)
          }
          proprities={textWrappers}
        />

        {/* input to change the text type of a component */}
        <PropritySelector
          label="Text Type"
          value={selectedComponent?.textType || textTypes[0].value}
          onValueChange={(e: ComponentTextType) =>
            textUtils.updateTextType(selectedComponent.id, e)
          }
          proprities={textTypes}
        />

        {/* input to change the text of a component */}
        <InputWithLabel
          label={selectedComponent?.textType || "Text"}
          placeholder={selectedComponent?.textType || "Text"}
          type="text"
          value={selectedComponent?.text || ""}
          onChange={(e: any) =>
            textUtils.updateTextContent(selectedComponent.id, e.target.value)
          }
        />
      </div>
    );
  }

  // if the selected component is a container
  if (selectedComponent.type === ComponentContentType.Container) {
    return (
      <div className="flex flex-col w-full h-full gap-y-2">
        {/* list all the children of the selected component */}
        <Label>Children</Label>
        {selectedComponent.children.map((child) => {
          const component = components[child];
          return (
            <div
              key={component.id}
              className="w-full flex flex-col items-start gap-x-1
            bg-white rounded-md p-2"
            >
              <div className="text-xs font-bold text-gray-500">
                {component?.type}
              </div>
              <div className="whitespace-nowrap overflow-hidden overflow-ellipsis w-full">
                {component?.name}
              </div>
            </div>
          );
        })}
        {/* add a new component */}
        <div className="flex items-end justify-end gap-x-2">
          <PropritySelector
            label="Add a new child"
            value={selectedType}
            onValueChange={(value) => {
              setSelectedType(value as ComponentContentType);
            }}
            proprities={contentTypes}
          />
          <TooltipButton
            onClick={() => {
              if (selectedType) {
                addComponent(selectedComponent.id, selectedType);
              }
            }}
            tooltipText="add a new child component to the selected component"
          >
            <PlusIcon className="h-4 w-4" />
          </TooltipButton>
        </div>
      </div>
    );
  }
}
