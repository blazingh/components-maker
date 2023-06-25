import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight, Dot } from "lucide-react";
import { BlockContentType, BlocksTree } from "@/types/types";

interface BlocksFileTreeProps {
  blocks: BlocksTree;
  activeBlockId: string;
  id: string;
  setActiveBlockId: (id: string) => void;
}

export function BlocksFileTree({
  blocks,
  id,
  activeBlockId,
  setActiveBlockId,
}: BlocksFileTreeProps) {
  const [open, setOpen] = React.useState(false);

  const block = blocks[id];

  if (!block) return null;

  // check if the component is a container type
  const isContainer = block.type === BlockContentType.Container;

  const hasChildren = isContainer && block.children.length > 0;

  return (
    <div className="relative border-l border-gray-200 w-full">
      <div className="flex items-center bg-secondary">
        <Button
          className="px-0 w-6 rounded-none"
          variant={activeBlockId === id ? "default" : "secondary"}
          onClick={() => hasChildren && setOpen((prev) => !prev)}
        >
          {!hasChildren ? (
            <Dot size={16} />
          ) : open ? (
            <ArrowDown size={16} />
          ) : (
            <ArrowRight size={16} />
          )}
        </Button>
        <Button
          className="rounded-none px-2 pl-1 w-full justify-start"
          variant={activeBlockId === id ? "default" : "secondary"}
          onClick={() => setActiveBlockId(id === activeBlockId ? "o" : id)}
        >
          {block.name}
        </Button>
      </div>
      <div className={`pl-2 w-full  ${open ? "block" : "hidden"}`}>
        {hasChildren &&
          block.children.map((child) => (
            <BlocksFileTree
              key={child}
              id={child}
              blocks={blocks}
              activeBlockId={activeBlockId}
              setActiveBlockId={setActiveBlockId}
            />
          ))}
      </div>
    </div>
  );
}
