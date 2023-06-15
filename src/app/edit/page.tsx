"use client";
// Import necessary modules
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  ArrowDownFromLine,
  ArrowRight,
  ArrowUpFromLine,
  ChevronDown,
  ChevronUp,
  Dot,
  PlusIcon,
  Trash,
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Define the structure of a component in the tree
interface TreeComponent {
  id: number;
  name: string;
  style: React.CSSProperties;
  parent?: number;
  children: { id: number }[];
}

// Define the initial state of components
const initialComponents: TreeComponent[] = [
  {
    id: 1,
    name: "root",
    style: {
      width: "500px",
      height: "500px",
      backgroundColor: "red",
    },
    parent: undefined,
    children: [
      {
        id: 2,
      },
      {
        id: 3,
      },
    ],
  },
  {
    id: 2,
    name: "header",
    style: {
      width: "50px",
      height: "50px",
      backgroundColor: "blue",
    },
    parent: 1,
    children: [],
  },
  {
    id: 3,
    name: "logo",
    style: {
      width: "50px",
      height: "50px",
      backgroundColor: "green",
    },
    parent: 1,
    children: [
      {
        id: 4,
      },
      {
        id: 5,
      },
    ],
  },
  {
    id: 4,
    name: "logo",
    style: {
      width: "50px",
      height: "50px",
      backgroundColor: "green",
    },
    parent: 3,
    children: [],
  },
  {
    id: 5,
    name: "logo",
    style: {
      width: "50px",
      height: "50px",
      backgroundColor: "green",
    },
    parent: 3,
    children: [],
  },
];

export default function Demo() {
  // Define state for components and activeId
  const [components, setComponents] =
    React.useState<TreeComponent[]>(initialComponents);
  const [activeId, setActiveId] = React.useState<number>(0);

  // Function to add a new component as a child to a given parent
  const addComponentTo = (parentId: number) => {
    // Find parent component
    const parentIndex = components.findIndex(
      (component) => component.id === parentId
    );

    // Return if parent not found
    if (parentIndex === -1) return;

    // Create a new component
    const newComponent: TreeComponent = {
      id: components.length + 1,
      name: "new component",
      style: {},
      parent: parentId,
      children: [],
    };

    // Add the new component to the children array of the parent component
    components[parentIndex].children.push(newComponent);

    // Add the new component to the components array
    setComponents([...components, newComponent]);
  };

  // Recursive function to delete a component and its children
  const deleteComponentAndChildren = (id: number) => {
    const index = components.findIndex((component) => component.id === id);
    if (index === -1) return;

    // Delete children recursively
    for (const child of components[index].children) {
      deleteComponentAndChildren(child.id);
    }

    // Delete the component
    components.splice(index, 1);
    setComponents([...components]);
  };

  // function to update the name of a component
  const updateComponentName = (id: number, name: string) => {
    const index = components.findIndex((component) => component.id === id);
    if (index === -1) return;

    // Update the name
    components[index].name = name;
    setComponents([...components]);
  };

  // function to update the style of a component
  const updateComponentStyle = (id: number, style: React.CSSProperties) => {
    const index = components.findIndex((component) => component.id === id);
    if (index === -1) return;

    // Update the style
    components[index].style = { ...components[index].style, ...style };
    setComponents([...components]);
  };

  // function to rearrange the position of a child component
  const rearrangeComponent = (id: number, direction: "up" | "down") => {
    const index = components.findIndex((component) => component.id === id);
    if (index === -1) return;

    // Find the parent component
    const parentIndex = components.findIndex(
      (component) => component.id === components[index].parent
    );
    if (parentIndex === -1) return;

    // Find the index of the child component
    const childIndex = components[parentIndex].children.findIndex(
      (child) => child.id === id
    );
    if (childIndex === -1) return;

    // move the child component up or down
    if (direction === "up") {
      if (childIndex === 0) return;
      components[parentIndex].children.splice(
        childIndex - 1,
        0,
        components[parentIndex].children.splice(childIndex, 1)[0]
      );
    } else {
      if (childIndex === components[parentIndex].children.length - 1) return;
      components[parentIndex].children.splice(
        childIndex + 1,
        0,
        components[parentIndex].children.splice(childIndex, 1)[0]
      );
    }

    // Update the components array
    setComponents([...components]);
  };

  // fuction to move a component to the same level as its parent
  const moveComponentToParentLevel = (id: number) => {
    const index = components.findIndex((component) => component.id === id);
    if (index === -1) return;

    // Find the parent component
    const parentIndex = components.findIndex(
      (component) => component.id === components[index].parent
    );

    // Find the index of the grandparent component
    const grandParentIndex = components.findIndex(
      (component) => component.id === components[parentIndex].parent
    );

    // Find the index of the parent component in the children array of the grandparent component
    const parentComponentIndex = components[
      grandParentIndex
    ].children.findIndex((child) => child.id === components[parentIndex].id);
    if (parentComponentIndex === -1) return;

    // add the component to the children array of the grandparent component above the parent component
    components[grandParentIndex].children.splice(
      parentComponentIndex,
      0,
      components[parentIndex].children.splice(
        components[parentIndex].children.findIndex((child) => child.id === id),
        1
      )[0]
    );

    //update the parent of the component
    components[index].parent = components[grandParentIndex].id;

    // Update the components array
    setComponents([...components]);
  };

  // function to move a component to the level of its first child of its next sibling
  const moveComponentToChildLevel = (id: number) => {
    const index = components.findIndex((component) => component.id === id);
    if (index === -1) return;

    // Find the parent component
    const parentIndex = components.findIndex(
      (component) => component.id === components[index].parent
    );
    if (parentIndex === -1) return;

    // Find the index of the component in the children array of the parent component
    const childIndex = components[parentIndex].children.findIndex(
      (child) => child.id === id
    );
    if (childIndex === -1) return;

    // check if the component is the last child of the parent component
    if (childIndex === components[parentIndex].children.length - 1) return;

    // get the next sibling id
    const nextSiblingId = components[parentIndex].children[childIndex + 1].id;

    // Find the index of the next sibling component
    const nextSiblingIndex = components.findIndex(
      (component) => component.id === nextSiblingId
    );
    if (nextSiblingIndex === -1) return;

    // add the component to the start of children array of the next sibling component
    components[nextSiblingIndex].children.unshift(
      components[parentIndex].children.splice(childIndex, 1)[0]
    );

    //update the parent of the component
    components[index].parent = nextSiblingId;

    // Update the components array
    setComponents([...components]);
  };

  return (
    <div className="flex w-full h-full">
      <div style={{ width: "200px" }}>
        <ComponentsTree
          addComponentTo={addComponentTo}
          components={components}
          id={1}
          activeId={activeId}
          setActiveId={setActiveId}
        />
      </div>

      {/* button to add a new component */}
      <Button variant="default" onClick={() => addComponentTo(activeId)}>
        <PlusIcon size={16} /> add child
      </Button>

      {/* button to delete a component */}
      <Button
        variant="destructive"
        onClick={() => deleteComponentAndChildren(activeId)}
      >
        <Trash size={16} /> delete
      </Button>

      {/* button to rearrange a component */}
      <Button
        variant="default"
        onClick={() => rearrangeComponent(activeId, "up")}
      >
        <ChevronUp size={16} />
      </Button>

      <Button
        variant="default"
        onClick={() => rearrangeComponent(activeId, "down")}
      >
        <ChevronDown size={16} />
      </Button>

      {/* button to move a component to the same level as its parent */}
      <Button
        variant="default"
        onClick={() => moveComponentToParentLevel(activeId)}
      >
        <ArrowUpFromLine size={16} />
      </Button>

      {/* button to move a component to the level of its first child of its next sibling */}
      <Button
        variant="default"
        onClick={() => moveComponentToChildLevel(activeId)}
      >
        <ArrowDownFromLine size={16} />
      </Button>

      <Input
        value={components.find((c) => c.id === activeId)?.name || ""}
        onChange={(e) => updateComponentName(activeId, e.target.value)}
      />
    </div>
  );
}

interface ComponentsTreeProps {
  components: TreeComponent[];
  addComponentTo: (parentId: number) => void;
  activeId: number;
  id: number;
  setActiveId: (id: number) => void;
}

function ComponentsTree({
  components,
  addComponentTo,
  id,
  activeId,
  setActiveId,
}: ComponentsTreeProps) {
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
          onClick={() => setActiveId(id)}
        >
          {component.name}
        </Button>
      </div>
      <div className={`ml-2 ${open ? "block" : "hidden"}`}>
        {component.children.map((child, index) => (
          <ComponentsTree
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
