"use client";
// Import necessary modules
import * as React from "react";

import { ComponentsFileTree } from "@/components/componentsFileTree";
import ComponentsPreviewTree from "@/components/componentsPreviewTree";
import { initialComponents } from "@/initialTestComponents";
import ComponentsEditBar from "@/components/componentsEditBar";
import { TreeComponentItem } from "@/types/types";

export default function Demo() {
  // Define state for components and activeId
  const [components, setComponents] =
    React.useState<TreeComponentItem[]>(initialComponents);
  const [activeId, setActiveId] = React.useState<number>(0);

  // Function to update the content of a component
  const updateComponentContent = (id: number, content: any) => {
    const index = components.findIndex((component) => component.id === id);
    if (index === -1) return;

    // Update the content
    components[index].content = content;
    setComponents([...components]);
  };

  // Function to add a new component as a child to a given parent
  const addComponentTo = (parentId: number) => {
    // Find parent component
    const parentIndex = components.findIndex(
      (component) => component.id === parentId
    );

    // Return if parent not found
    if (parentIndex === -1) return;

    // Create a new component
    const newComponent: TreeComponentItem = {
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

  const [selectedComponent, setSelectedComponent] =
    React.useState<TreeComponentItem>();

  React.useEffect(() => {
    const index = components.findIndex(
      (component) => component.id === activeId
    );
    if (index === -1) return;

    setSelectedComponent(components[index]);
  }, [activeId, components]);

  return (
    <div className="flex w-full h-screen">
      <div
        style={{
          maxWidth: 200,
          minWidth: "200px",
        }}
      >
        <ComponentsFileTree
          addComponentTo={addComponentTo}
          components={components}
          id={1}
          activeId={activeId}
          setActiveId={setActiveId}
        />
      </div>

      <div
        className="w-full h-full flex items-center justify-center p-6"
        style={{
          maxWidth: "calc(100% - 425px)",
        }}
      >
        <ComponentsPreviewTree
          components={components}
          id={1}
          activeId={activeId}
        />
      </div>

      <div
        className="flex flex-col flex-1 p-2 bg-gray-100 gap-y-2 overflow-y-scroll"
        style={{
          maxWidth: "225px",
          minWidth: "225px",
          maxHeight: "100%",
        }}
      >
        <ComponentsEditBar
          updateComponentContent={updateComponentContent}
          selectedComponent={selectedComponent}
          activeId={activeId}
          addComponentTo={addComponentTo}
          rearrangeComponent={rearrangeComponent}
          moveComponentToParentLevel={moveComponentToParentLevel}
          moveComponentToChildLevel={moveComponentToChildLevel}
          updateComponentName={updateComponentName}
          updateComponentStyle={updateComponentStyle}
          deleteComponentAndChildren={deleteComponentAndChildren}
        />
      </div>
    </div>
  );
}
