import { Input } from "./ui/input";
import TooltipButton from "./ui/tooltipButton";
import {
  ArrowDownFromLine,
  ArrowUpFromLine,
  ChevronUp,
  Pipette,
  PlusIcon,
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
import {
  HexAlphaColorPicker,
  HexColorInput,
  HexColorPicker,
} from "react-colorful";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import React from "react";
import { ComponentContentType, TreeComponentItem } from "@/types/types";
import { ComponentStylePropritiesOptions as ComponentPropritiesOptions } from "@/constants/objects";
import InputWithUnit from "./inputs/inputWithUnit";
import Position from "./porpreties/position";
import Layout from "./porpreties/layout";

export default function ComponentsEditBar({
  selectedComponent,
  activeId,
  addComponentTo,
  rearrangeComponent,
  moveComponentToParentLevel,
  moveComponentToChildLevel,
  updateComponentName,
  updateComponentStyle,
  deleteComponentAndChildren,
}: {
  selectedComponent: TreeComponentItem | undefined;
  activeId: number;
  addComponentTo: (parentId: number, type: ComponentContentType) => void;
  rearrangeComponent: (id: number, direction: "up" | "down") => void;
  moveComponentToParentLevel: (id: number) => void;
  moveComponentToChildLevel: (id: number) => void;
  updateComponentName: (id: number, name: string) => void;
  updateComponentStyle: (id: number, style: React.CSSProperties) => void;
  deleteComponentAndChildren: (id: number) => void;
}) {
  return (
    <>
      {/* input to change the name of a component */}
      <InputWithLabel
        label="Component Name"
        placeholder="Component Name"
        type="text"
        value={selectedComponent?.name || ""}
        onChange={(e) => updateComponentName(activeId, e.target.value)}
      />

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
        <AccordionItem value="Edit Content">
          <AccordionTrigger>Content</AccordionTrigger>
          <AccordionContent></AccordionContent>
        </AccordionItem>
        <AccordionItem value="Move Component">
          <AccordionTrigger>Position</AccordionTrigger>
          <AccordionContent>
            <Position
              styles={selectedComponent?.style}
              setStyles={(atr: any, value: any) =>
                updateComponentStyle(activeId, {
                  ...selectedComponent?.style,
                  [atr]: value,
                })
              }
            />

            <div className="flex justify-around">
              {/* button to rearrange a component up */}
              <TooltipButton
                variant="default"
                onClick={() => rearrangeComponent(activeId, "up")}
                tooltipText="Move the selected component up"
              >
                <ChevronUp size={16} />
              </TooltipButton>

              {/* button to rearrange a component down */}
              <TooltipButton
                variant="default"
                onClick={() => rearrangeComponent(activeId, "down")}
                tooltipText="Move the selected component down"
              >
                <ChevronDown size={16} />
              </TooltipButton>

              {/* button to move a component to the same level as its parent */}
              <TooltipButton
                variant="default"
                onClick={() => moveComponentToParentLevel(activeId)}
                tooltipText="Move the selected component to the same level as its parent"
              >
                <ArrowUpFromLine size={16} />
              </TooltipButton>

              {/* button to move a component to the level of its first child of its next sibling */}
              <TooltipButton
                variant="default"
                onClick={() => moveComponentToChildLevel(activeId)}
                tooltipText="Move the selected component into its next sibling"
              >
                <ArrowDownFromLine size={16} />
              </TooltipButton>
            </div>
          </AccordionContent>
        </AccordionItem>
        {/* input to change the width and height of a component */}
        <AccordionItem value="Component Size">
          <AccordionTrigger>Size</AccordionTrigger>
          <AccordionContent>
            {/* select input to choose the width and height of a component */}
            <div className="flex gap-x-2">
              {/* select input to choose the width of a component */}
              <PropritySelector
                label="Width"
                value={
                  typeof selectedComponent?.style?.width === "number"
                    ? "static"
                    : selectedComponent?.style?.width || "static"
                }
                onValueChange={(value) =>
                  updateComponentStyle(activeId, {
                    width: value === "static" ? 100 : value,
                  })
                }
                proprities={ComponentPropritiesOptions.size}
              />
              {/* select input to choose the height of a component */}
              <PropritySelector
                label="Height"
                value={
                  typeof selectedComponent?.style?.height === "number"
                    ? "static"
                    : selectedComponent?.style?.height || "static"
                }
                onValueChange={(value) =>
                  updateComponentStyle(activeId, {
                    height: value === "static" ? 100 : value,
                  })
                }
                proprities={ComponentPropritiesOptions.size}
              />
            </div>
            {/* input to staticly set the width and height of a component */}
            <div className="flex gap-x-2 mt-2">
              {/* input to staticly set the width of a component */}
              <Input
                disabled={typeof selectedComponent?.style?.width !== "number"}
                type="number"
                placeholder="Width"
                className="bg-white"
                value={selectedComponent?.style?.width || 0}
                onChange={(e) =>
                  updateComponentStyle(activeId, {
                    width: Number(e.target.value),
                  })
                }
              />
              {/* input to staticly set the height of a component */}
              <Input
                disabled={typeof selectedComponent?.style?.height !== "number"}
                type="number"
                placeholder="Height"
                className="bg-white"
                value={selectedComponent?.style?.height || 0}
                onChange={(e) =>
                  updateComponentStyle(activeId, {
                    height: Number(e.target.value),
                  })
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        {/* input to change the background and content color of a component */}
        <AccordionItem value="Component Color">
          <AccordionTrigger>Color</AccordionTrigger>
          <AccordionContent>
            {/* input to change the content color of a component */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="color" className="text-sm">
                Content Color
              </Label>
              <div className="flex gap-x-2 w-full">
                <HexColorInput
                  className="w-full rounded-md px-2 py-1 border border-gray-200"
                  color={selectedComponent?.style?.color || "#000"}
                  onChange={(color) =>
                    updateComponentStyle(activeId, { color })
                  }
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Pipette width={16} height={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <HexAlphaColorPicker
                      color={selectedComponent?.style?.color || "#000"}
                      onChange={(color) =>
                        updateComponentStyle(activeId, { color })
                      }
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {/* input to change the background color of a component */}
            <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
              <Label htmlFor="background-color" className="text-sm">
                Background Color
              </Label>
              <div className="flex gap-x-2 w-full">
                <HexColorInput
                  className="w-full rounded-md px-2 py-1 border border-gray-200"
                  color={selectedComponent?.style?.backgroundColor || "#000"}
                  onChange={(backgroundColor) =>
                    updateComponentStyle(activeId, { backgroundColor })
                  }
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Pipette width={16} height={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <HexAlphaColorPicker
                      color={
                        selectedComponent?.style?.backgroundColor || "#000"
                      }
                      onChange={(backgroundColor) =>
                        updateComponentStyle(activeId, { backgroundColor })
                      }
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        {/* input to change the border of a component */}
        <AccordionItem value="Component Border">
          <AccordionTrigger>Border</AccordionTrigger>
          <AccordionContent>
            {/* input to change the border style of a component */}
            <PropritySelector
              label="Border Style"
              value={selectedComponent?.style?.borderStyle || "none"}
              onValueChange={(borderStyle) =>
                updateComponentStyle(activeId, { borderStyle })
              }
              proprities={ComponentPropritiesOptions.borderStyle}
            />
            {/* input to change the border width of a component */}
            <InputWithLabel
              type="number"
              label="Border Width"
              placeholder="Border Width"
              value={selectedComponent?.style?.borderWidth || 0}
              onChange={(e) =>
                updateComponentStyle(activeId, {
                  borderWidth: Number(e.target.value),
                })
              }
            />
            {/* input to change the border radius of a component */}
            <InputWithLabel
              type="number"
              label="Border Radius"
              placeholder="Border Radius"
              value={selectedComponent?.style?.borderRadius || 0}
              onChange={(e) =>
                updateComponentStyle(activeId, {
                  borderRadius: Number(e.target.value),
                })
              }
            />
            {/* input to change the border color of a component */}
            <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
              <Label htmlFor="border-color" className="text-sm">
                Border Color
              </Label>
              <div className="flex gap-x-2 w-full">
                <HexColorInput
                  className="w-full rounded-md px-2 py-1 border border-gray-200"
                  color={selectedComponent?.style?.borderColor || "#000"}
                  onChange={(borderColor) =>
                    updateComponentStyle(activeId, { borderColor })
                  }
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Pipette width={16} height={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <HexColorPicker
                      color={selectedComponent?.style?.borderColor || "#000"}
                      onChange={(borderColor) =>
                        updateComponentStyle(activeId, { borderColor })
                      }
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        {/* input to change the layout of a component */}
        <AccordionItem value="Component Layout">
          <AccordionTrigger>Layout</AccordionTrigger>
          <AccordionContent>
            <Layout
              styles={selectedComponent?.style}
              setStyles={(atr: string, value: any) =>
                updateComponentStyle(activeId, { [atr]: value })
              }
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <InputWithUnit
        label="width"
        value="10px"
        placeholder="ro"
        onChange={(e) => console.log(e)}
      />

      {/* button to delete a component */}
      <TooltipButton
        variant="destructive"
        onClick={() => deleteComponentAndChildren(activeId)}
        tooltipText="delete the component and all its children"
      >
        <Trash className="mr-2 h-4 w-4" />
        Delete Component
      </TooltipButton>
    </>
  );
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
        <SelectTrigger>
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
