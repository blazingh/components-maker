import {
  BlockContentType,
  BlocksTree,
  ContainerBlockItem,
  ContainerUtils,
} from "@/types/types";
import React from "react";
import TooltipButton from "../ui/tooltipButton";
import { PlusIcon } from "lucide-react";
import { InputSelection } from "../inputs/inputSelection";
import { InputWithLabel } from "../inputs/inputWithLabel";
import { Label } from "../ui/label";

const contentTypes = Object.keys(BlockContentType).map((key) => ({
  label: key,
  value: BlockContentType[key as keyof typeof BlockContentType],
}));

interface ContainerContentProps {
  blocks: BlocksTree;
  selectedBlock: ContainerBlockItem;
  containerUtils: ContainerUtils;
  addBlock: (parent: string, type: BlockContentType) => void;
}

export function ContainerContent({
  blocks,
  selectedBlock,
  addBlock,
  containerUtils,
}: ContainerContentProps) {
  const [selectedType, setSelectedType] = React.useState<BlockContentType>(
    contentTypes[0].value
  );

  return (
    <div className="flex flex-col w-full h-full gap-y-2">
      {/* input to change the name of the block */}
      <InputWithLabel
        label="Name"
        placeholder="name"
        type="text"
        value={selectedBlock.name}
        onChange={(value: string) => {
          containerUtils.updateName(value);
        }}
      />

      <Label>Children</Label>
      {/* list all the children of the selected block */}
      {selectedBlock.children.map((child) => {
        const block = blocks[child];
        return (
          <div
            key={block.id}
            className="w-full flex flex-col items-start gap-x-1
            bg-secondary rounded-md p-2"
          >
            <div className="text-xs font-bold">{block?.type}</div>
            <div className="whitespace-nowrap overflow-hidden overflow-ellipsis w-full">
              {block?.name}
            </div>
          </div>
        );
      })}
      {/* add a new block */}
      <div className="flex items-end justify-end gap-x-2">
        <InputSelection
          label="Add a new child"
          value={selectedType}
          onValueChange={(value) => {
            setSelectedType(value as BlockContentType);
          }}
          proprities={contentTypes}
        />
        <TooltipButton
          onClick={() => {
            if (selectedType) {
              addBlock(selectedBlock.id, selectedType);
            }
          }}
          tooltipText="add a new child block to the selected block"
        >
          <PlusIcon className="h-4 w-4" />
        </TooltipButton>
      </div>
    </div>
  );
}
