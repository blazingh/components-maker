import { Input } from "./ui/input";
import TooltipButton from "./ui/tooltipButton";
import {
  ArrowDownFromLine,
  ArrowUpFromLine,
  ChevronUp,
  Pipette,
  Trash,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { ChevronDown } from "lucide-react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { HexAlphaColorPicker, HexColorInput } from "react-colorful";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import React from "react";
import {
  ComponentContentType,
  ComponentItem,
  ComponentsTree,
} from "@/types/types";
import { ComponentStylePropritiesOptions as ComponentPropritiesOptions } from "@/constants/objects";
import Position from "./porpreties/position";
import Layout from "./porpreties/layout";
import Border from "./porpreties/borber";
import { Content } from "./porpreties/content";
import { Typography } from "./porpreties/typography";
import { ContainerUtils, TextUtils } from "@/app/edit/page";
import Size from "./porpreties/size";

export default function ComponentsEditBar({
  selectedComponent,
  activeId,
  components,
  containerUtils,
  textUtils,
}: {
  selectedComponent: ComponentItem | undefined;
  activeId: string;
  components: ComponentsTree;
  containerUtils: ContainerUtils;
  textUtils: TextUtils;
}) {
  // if no component is selected, return null
  if (!selectedComponent) return null;

  // if the selected component is a text component
  if (selectedComponent?.type === ComponentContentType.Text) {
    return (
      <>
        {/* input to change the name of a component */}
        <InputWithLabel
          label="Component Name"
          placeholder="Component Name"
          type="text"
          value={selectedComponent?.name || ""}
          onChange={(e: any) =>
            textUtils.updateTextName(activeId, e.target.value)
          }
        />

        {/* input to change the text of a component */}
        <InputWithLabel
          label="Text"
          placeholder="Text"
          type="text"
          value={selectedComponent?.text || ""}
          onChange={(e: any) => textUtils.updateText(activeId, e.target.value)}
        />

        {/* input to change the text style of a component */}
        <Accordion type="single" collapsible>
          <AccordionItem value="Typography">
            <AccordionTrigger>Typography</AccordionTrigger>
            <AccordionContent>
              <Typography
                styles={selectedComponent?.style}
                setStyles={(atr: any, value: any) =>
                  textUtils.updateTextStyle(activeId, atr, value)
                }
              />
            </AccordionContent>
          </AccordionItem>

          {/* input to change the size of a component */}
          {}
          <AccordionItem value="Component Size">
            <AccordionTrigger>Size</AccordionTrigger>
            <AccordionContent>
              <Size
                styles={selectedComponent?.style}
                setStyles={(atr: any, value: any) =>
                  textUtils.updateTextStyle(activeId, atr, value)
                }
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </>
    );
  }

  if (selectedComponent?.type === ComponentContentType.Container) {
    return (
      <>
        {/* input to change the name of a component */}
        <InputWithLabel
          label="Component Name"
          placeholder="Component Name"
          type="text"
          value={selectedComponent?.name || ""}
          onChange={(e) =>
            containerUtils.updateContainerName(activeId, e.target.value)
          }
        />

        <Accordion type="single" collapsible>
          <AccordionItem value="Edit Content">
            <AccordionTrigger>Content</AccordionTrigger>
            <AccordionContent>
              <Content
                components={components}
                selectedComponent={selectedComponent}
                addComponent={(parent: string, type: ComponentContentType) => {
                  if (type === ComponentContentType.Container) {
                    containerUtils.addContainer(parent);
                  } else if (type === ComponentContentType.Text) {
                    textUtils.addText(parent);
                  }
                }}
                deleteComponent={(id: string) =>
                  containerUtils.removeContainer(id)
                }
              />
            </AccordionContent>
          </AccordionItem>

          {/* button to add a new child component */}
          {/* <TooltipButton */}
          {/*   variant="default" */}
          {/*   onClick={() => addComponentTo(activeId)} */}
          {/*   tooltipText="Add a new child component to the selected component" */}
          {/* > */}
          {/*   <PlusIcon className="mr-2 h-4 w-4" /> */}
          {/*   Add Child */}
          {/* </TooltipButton> */}

          <Accordion type="single" collapsible>
            {/* input to change the position of a component */}
            <AccordionItem value="Move Component">
              <AccordionTrigger>Position</AccordionTrigger>
              <AccordionContent>
                <Position
                  styles={selectedComponent?.style}
                  setStyles={(atr: any, value: any) =>
                    containerUtils.updateContainerStyle(activeId, atr, value)
                  }
                />
              </AccordionContent>
            </AccordionItem>

            {/* input to change the layout of a component */}
            <AccordionItem value="Layout">
              <AccordionTrigger>Layout</AccordionTrigger>
              <AccordionContent>
                <Layout
                  styles={selectedComponent?.style}
                  setStyles={(atr: any, value: any) =>
                    containerUtils.updateContainerStyle(activeId, atr, value)
                  }
                />
              </AccordionContent>
            </AccordionItem>

            {/* input to change the width and height of a component */}
            <AccordionItem value="Component Size">
              <AccordionTrigger>Size</AccordionTrigger>
              <AccordionContent>
                <Size
                  styles={selectedComponent?.style}
                  setStyles={(atr: any, value: any) =>
                    containerUtils.updateContainerStyle(activeId, atr, value)
                  }
                />
              </AccordionContent>
            </AccordionItem>

            {/* input to change the background and content color of a component */}
            <AccordionItem value="Component Color">
              <AccordionTrigger>Color</AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>

            {/* input to change the border of a component */}
            <AccordionItem value="Component Border">
              <AccordionTrigger>Border</AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* button to delete a component */}
          <TooltipButton
            variant="destructive"
            onClick={() => containerUtils.removeContainer(activeId)}
            tooltipText="delete the component and all its children"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete Component
          </TooltipButton>
        </Accordion>
      </>
    );
  }
}

interface PropritySelectorProps {
  label: string;
  value: string;
  onValueChange: (value: any) => void;
  proprities: { label: string; value: string }[];
}

export function PropritySelector({
  label,
  value,
  onValueChange,
  proprities,
}: PropritySelectorProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
      <Label htmlFor="justify-content" className="text-sm">
        {label}
      </Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="bg-white">
          <SelectValue placeholder="Justify Content" />
        </SelectTrigger>
        <SelectContent>
          {proprities.map((proprity, index) => (
            <SelectItem key={index} value={proprity.value}>
              {proprity.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

interface InputWithLabelProps {
  label: string;
  value: string | number;
  placeholder: string;
  type: string;
  onChange: (value: any) => void;
}

export function InputWithLabel({
  label,
  value,
  onChange,
  placeholder,
  type,
}: InputWithLabelProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
      <Label htmlFor="border-radius" className="text-sm">
        {label}
      </Label>
      <Input
        type={type}
        placeholder={placeholder}
        className="bg-white"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
