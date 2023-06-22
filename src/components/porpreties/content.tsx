import {
  ComponentContentType,
  ComponentItem,
  ComponentsTree,
} from "@/types/types";
import React from "react";
import { PropritySelector } from "../componentsEditBar";
import TooltipButton from "../ui/tooltipButton";
import { PlusIcon } from "lucide-react";
import { Label } from "../ui/label";

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
}: ContentProps) {
  const [selectedType, setSelectedType] = React.useState<ComponentContentType>(
    proprities()[0].value as any
  );

  if (!selectedComponent) {
    return <div>select a component</div>;
  }

  const isContainer = selectedComponent.type === ComponentContentType.Container;

  return (
    <div className="flex flex-col w-full h-full gap-y-2">
      {/* list all the children of the selected component */}
      <Label>Children</Label>
      {isContainer &&
        selectedComponent.children.map((child) => {
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
          <PlusIcon className="h-4 w-4" />
        </TooltipButton>
      </div>
    </div>
  );
}
