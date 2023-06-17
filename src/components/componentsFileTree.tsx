import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight, Dot } from "lucide-react";
import { TreeComponent } from "@/app/edit/page";

interface ComponentsFileTreeProps {
  components: TreeComponent[];
  addComponentTo: (parentId: number) => void;
  activeId: number;
  id: number;
  setActiveId: (id: number) => void;
}

export function ComponentsFileTree({
  components,
  addComponentTo,
  id,
  activeId,
  setActiveId,
}: ComponentsFileTreeProps) {
  const [open, setOpen] = React.useState(false);

  const component = components.find((c) => c.id === id);

  if (!component) return null;

  const hasChildren = component.children.length > 0;

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
          onClick={() => setActiveId(id === activeId ? 0 : id)}
        >
          {component.name}
        </Button>
      </div>
      <div className={`ml-2 ${open ? "block" : "hidden"}`}>
        {component.children.map((child) => (
          <ComponentsFileTree
            addComponentTo={addComponentTo}
            key={child.id}
            id={child.id}
            components={components}
            activeId={activeId}
            setActiveId={setActiveId}
          />
        ))}
      </div>
    </div>
  );
}
