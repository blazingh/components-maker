import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight, Dot } from "lucide-react";
import { ComponentContentType, ComponentsTree } from "@/types/types";

interface ComponentsFileTreeProps {
  components: ComponentsTree;
  activeId: string;
  id: string;
  setActiveId: (id: string) => void;
}

export function ComponentsFileTree({
  components,
  id,
  activeId,
  setActiveId,
}: ComponentsFileTreeProps) {
  const [open, setOpen] = React.useState(false);

  const component = components[id];

  if (!component) return null;

  // check if the component is a container type
  const isContainer = component.type === ComponentContentType.Container;

  const hasChildren = isContainer && component.children.length > 0;

  return (
    <div className="relative border-l border-gray-200">
      <div className="flex items-center bg-secondary">
        <Button
          className="px-0 w-6 rounded-none"
          variant={activeId === id ? "default" : "secondary"}
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
          variant={activeId === id ? "default" : "secondary"}
          onClick={() => setActiveId(id === activeId ? "o" : id)}
        >
          {component.name}
        </Button>
      </div>
      <div className={`ml-2 ${open ? "block" : "hidden"}`}>
        {hasChildren &&
          component.children.map((child) => (
            <ComponentsFileTree
              key={child}
              id={child}
              components={components}
              activeId={activeId}
              setActiveId={setActiveId}
            />
          ))}
      </div>
    </div>
  );
}
