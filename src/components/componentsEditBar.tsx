import { TreeComponent } from "@/app/edit/page";
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

const propritiesOptions = {
  borderStyle: [
    { value: "none", label: "None" },
    { value: "solid", label: "Solid" },
    { value: "dashed", label: "Dashed" },
    { value: "dotted", label: "Dotted" },
    { value: "double", label: "Double" },
    { value: "groove", label: "Groove" },
    { value: "ridge", label: "Ridge" },
    { value: "inset", label: "Inset" },
    { value: "outset", label: "Outset" },
  ],
  display: [
    { value: "block", label: "Block" },
    { value: "inline", label: "Inline" },
    { value: "flex", label: "Flex" },
    { value: "grid", label: "Grid" },
  ],
  flexDirection: [
    { value: "row", label: "Row" },
    { value: "row-reverse", label: "Row Reverse" },
    { value: "column", label: "Column" },
    { value: "column-reverse", label: "Column Reverse" },
  ],
  flexWrap: [
    { value: "nowrap", label: "No Wrap" },
    { value: "wrap", label: "Wrap" },
    { value: "wrap-reverse", label: "Wrap Reverse" },
  ],
  justifyContent: [
    { value: "flex-start", label: "Flex Start" },
    { value: "flex-end", label: "Flex End" },
    { value: "center", label: "Center" },
    { value: "space-between", label: "Space Between" },
    { value: "space-around", label: "Space Around" },
    { value: "space-evenly", label: "Space Evenly" },
  ],
  alignItems: [
    { value: "flex-start", label: "Flex Start" },
    { value: "flex-end", label: "Flex End" },
    { value: "center", label: "Center" },
    { value: "baseline", label: "Baseline" },
  ],
};

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
  selectedComponent: TreeComponent | undefined;
  activeId: number;
  addComponentTo: (parentId: number) => void;
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
      <Input
        placeholder="Component Name"
        className="bg-white"
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
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="width" className="text-sm">
                  Width
                </Label>
                <Select
                  value={
                    typeof selectedComponent?.style?.width === "number"
                      ? "static"
                      : selectedComponent?.style?.width
                  }
                  onValueChange={(value) =>
                    updateComponentStyle(activeId, {
                      width: value === "static" ? 100 : value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Width" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100%">Fill</SelectItem>
                    <SelectItem value="static">Static</SelectItem>
                    <SelectItem value="max-content">Content</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* select input to choose the height of a component */}
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="height" className="text-sm">
                  Height
                </Label>
                <Select
                  value={
                    typeof selectedComponent?.style?.height === "number"
                      ? "static"
                      : selectedComponent?.style?.height
                  }
                  onValueChange={(value) =>
                    updateComponentStyle(activeId, {
                      height: value === "static" ? 100 : value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Height" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100%">Fill</SelectItem>
                    <SelectItem value="static">Static</SelectItem>
                    <SelectItem value="max-content">Content</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
              proprities={propritiesOptions.borderStyle}
            />
            {/* input to change the border width of a component */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="border-width" className="text-sm">
                Border Width
              </Label>
              <Input
                type="number"
                placeholder="Border Width"
                className="bg-white"
                value={selectedComponent?.style?.borderWidth || 0}
                onChange={(e) =>
                  updateComponentStyle(activeId, {
                    borderWidth: Number(e.target.value),
                  })
                }
              />
            </div>
            {/* input to change the border radius of a component */}
            <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
              <Label htmlFor="border-radius" className="text-sm">
                Border Radius
              </Label>
              <Input
                type="number"
                placeholder="Border Radius"
                className="bg-white"
                value={selectedComponent?.style?.borderRadius || 0}
                onChange={(e) =>
                  updateComponentStyle(activeId, {
                    borderRadius: Number(e.target.value),
                  })
                }
              />
            </div>
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
              proprities={propritiesOptions.display}
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
                  proprities={propritiesOptions.flexDirection}
                />
                {/* input to change the flex wrap of a component */}
                <PropritySelector
                  label="Flex Wrap"
                  value={selectedComponent?.style?.flexWrap || "nowrap"}
                  onValueChange={(flexWrap: any) =>
                    updateComponentStyle(activeId, { flexWrap })
                  }
                  proprities={propritiesOptions.flexWrap}
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
                  proprities={propritiesOptions.justifyContent}
                />
                {/* input to change the align items of a component */}
                <PropritySelector
                  label="Align Items"
                  value={selectedComponent?.style?.alignItems || "flex-start"}
                  onValueChange={(alignItems: any) =>
                    updateComponentStyle(activeId, { alignItems })
                  }
                  proprities={propritiesOptions.alignItems}
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
