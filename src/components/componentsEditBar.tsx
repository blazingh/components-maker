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
import { TreeComponentItem } from "@/types/types";
import { ComponentPropritiesOptions } from "@/constants/objects";

export default function ComponentsEditBar({
  selectedComponent,
  activeId,
  addComponentTo,
  rearrangeComponent,
  moveComponentToParentLevel,
  moveComponentToChildLevel,
  updateComponentName,
  updateComponentStyle,
  updateComponentContent,
  deleteComponentAndChildren,
}: {
  selectedComponent: TreeComponentItem | undefined;
  activeId: number;
  addComponentTo: (parentId: number) => void;
  rearrangeComponent: (id: number, direction: "up" | "down") => void;
  moveComponentToParentLevel: (id: number) => void;
  moveComponentToChildLevel: (id: number) => void;
  updateComponentName: (id: number, name: string) => void;
  updateComponentStyle: (id: number, style: React.CSSProperties) => void;
  updateComponentContent: (id: number, content: any) => void;
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
      <TooltipButton
        variant="default"
        onClick={() => addComponentTo(activeId)}
        tooltipText="Add a new child component to the selected component"
      >
        <PlusIcon className="mr-2 h-4 w-4" />
        Add Child
      </TooltipButton>

      <Accordion type="single" collapsible>
        <AccordionItem value="Edit Content">
          <AccordionTrigger>Content</AccordionTrigger>
          <AccordionContent>
            {/* input to change the content type of a component */}
            <PropritySelector
              label="Content Type"
              value={selectedComponent?.content?.type || "none"}
              onValueChange={(type: any) =>
                updateComponentContent(activeId, {
                  ...selectedComponent?.content,
                  type,
                })
              }
              proprities={ComponentPropritiesOptions.contentTypes}
            />
            {/* options if the content is a tect */}
            {selectedComponent?.content?.type === "text" && (
              <>
                {/* input to change the text of a component */}
                <InputWithLabel
                  label="Text"
                  placeholder="Text"
                  type="text"
                  value={selectedComponent?.content?.text || ""}
                  onChange={(e) =>
                    updateComponentContent(activeId, {
                      ...selectedComponent?.content,
                      text: e.target.value,
                    })
                  }
                />
                {/* input to change the font family of a component */}
                <PropritySelector
                  label="Font Family"
                  value={selectedComponent?.style?.fontFamily || "sans-serif"}
                  onValueChange={(fontFamily: any) =>
                    updateComponentContent(activeId, {
                      ...selectedComponent?.content,
                      style: {
                        ...selectedComponent?.style,
                        fontFamily,
                      },
                    })
                  }
                  proprities={ComponentPropritiesOptions.fontFamily}
                />
                {/* input to change the font size of a component */}
                <InputWithLabel
                  type="number"
                  label="Font Size"
                  placeholder="Font Size"
                  value={selectedComponent?.style?.fontSize || 16}
                  onChange={(e) =>
                    updateComponentContent(activeId, {
                      ...selectedComponent?.content,
                      style: {
                        ...selectedComponent?.style,
                        fontSize: Number(e.target.value),
                      },
                    })
                  }
                />
                {/* input to change the font weight of a component */}
                <PropritySelector
                  label="Font Weight"
                  value={
                    String(selectedComponent?.style?.fontWeight) || "normal"
                  }
                  onValueChange={(fontWeight: any) =>
                    updateComponentContent(activeId, {
                      ...selectedComponent?.content,
                      style: {
                        ...selectedComponent?.style,
                        fontWeight,
                      },
                    })
                  }
                  proprities={ComponentPropritiesOptions.fontWeight}
                />
              </>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Move Component">
          <AccordionTrigger>Position</AccordionTrigger>
          <AccordionContent>
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
            {/* input to change the display of a component */}
            <PropritySelector
              label="Display"
              value={selectedComponent?.style?.display || "block"}
              onValueChange={(display: any) =>
                updateComponentStyle(activeId, { display })
              }
              proprities={ComponentPropritiesOptions.display}
            />
            {/* options for when the flex display is selected */}
            {selectedComponent?.style?.display === "flex" && (
              <>
                {/* input to change the flex direction of a component */}
                <PropritySelector
                  label="Flex Direction"
                  value={selectedComponent?.style?.flexDirection || "row"}
                  onValueChange={(flexDirection: any) =>
                    updateComponentStyle(activeId, { flexDirection })
                  }
                  proprities={ComponentPropritiesOptions.flexDirection}
                />
                {/* input to change the flex wrap of a component */}
                <PropritySelector
                  label="Flex Wrap"
                  value={selectedComponent?.style?.flexWrap || "nowrap"}
                  onValueChange={(flexWrap: any) =>
                    updateComponentStyle(activeId, { flexWrap })
                  }
                  proprities={ComponentPropritiesOptions.flexWrap}
                />
                {/* input to change the justify content of a component */}
                <PropritySelector
                  label="Justify Content"
                  value={
                    selectedComponent?.style?.justifyContent || "flex-start"
                  }
                  onValueChange={(justifyContent: any) =>
                    updateComponentStyle(activeId, { justifyContent })
                  }
                  proprities={ComponentPropritiesOptions.justifyContent}
                />
                {/* input to change the align items of a component */}
                <PropritySelector
                  label="Align Items"
                  value={selectedComponent?.style?.alignItems || "flex-start"}
                  onValueChange={(alignItems: any) =>
                    updateComponentStyle(activeId, { alignItems })
                  }
                  proprities={ComponentPropritiesOptions.alignItems}
                />
              </>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

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

function PropritySelector({
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

function InputWithLabel({
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
