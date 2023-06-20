"use client";
import * as React from "react";

import { ComponentsFileTree } from "@/components/componentsFileTree";
import ComponentsPreviewTree from "@/components/componentsPreviewTree";
import { initialComponents } from "@/initialTestComponents";
import ComponentsEditBar from "@/components/componentsEditBar";
import {
  ComponentContentType,
  ComponentsTree,
  ContainerComponentItem,
} from "@/types/types";

export default function Demo() {
  // Define state for components and activeId
  const [components, setComponents] =
    React.useState<ComponentsTree>(initialComponents);
  const [activeId, setActiveId] = React.useState<string>("1");

  // Function to add a new component as a child to a given parent
  const addComponentTo = (parentId: string, type: ComponentContentType) => {
    // Create a new component
    if (type === ComponentContentType.Container) {
      const newComponent: ContainerComponentItem = {
        id: String(Math.random()),
        name: "New Container",
        type: ComponentContentType.Container,
        children: [],
        style: {},
      };

      // update the components
      components[parentId].children.push(newComponent);
      components[newComponent.id] = newComponent;

      // update the state
      setComponents({ ...components });
    }
  };

  // Recursive function to delete a component and its children
  const deleteComponentAndChildren = (id: string) => {
    // Delete children recursively
    for (const child of components[id].children) {
      deleteComponentAndChildren(child.id);
    }

    // Delete the component from its parent's children array
    const parentId = components[id].parent;
    if (parentId) {
      const index = components[parentId].children.findIndex(
        (child) => child.id === id
      );
      components[parentId].children.splice(index, 1);
    }

    // Delete the component from the components object
    delete components[id];

    // Update the state
    setComponents({ ...components });
  };

  // function to update the name of a component
  const updateComponentName = (id: string, name: string) => {
    components[id].name = name;
    setComponents({ ...components });
  };

  // function to update the style of a component
  const updateComponentStyle = (id: string, style: React.CSSProperties) => {
    components[id].style = { ...components[id].style, ...style };
    setComponents({ ...components });
  };

  // function to rearrange the position of a child component
  const rearrangeComponent = (id: string, direction: "up" | "down") => {
    // Find the parent id
    const parentId = components[id].parent;

    if (!parentId) return;

    // Find the index of the child component
    const childIndex = components[parentId].children.findIndex(
      (child) => child.id === id
    );
    if (childIndex === -1) return;

    // move the child component up or down
    if (direction === "up") {
      if (childIndex === 0) return;
      components[parentId].children.splice(
        childIndex - 1,
        0,
        components[parentId].children.splice(childIndex, 1)[0]
      );
    } else {
      if (childIndex === components[parentId].children.length - 1) return;
      components[parentId].children.splice(
        childIndex + 1,
        0,
        components[parentId].children.splice(childIndex, 1)[0]
      );
    }

    // Update the state
    setComponents({ ...components });
  };

  // fuction to move a component to the same level as its parent
  const moveComponentToParentLevel = (id: string) => {
    // find parent id
    const parentId = components[id].parent;

    if (!parentId) return;

    // Find the id of the grandparent component
    const grandParentId = components[parentId].parent;

    if (!grandParentId) return;

    // Find the index of the parent component in the children array of the grandparent component
    const parentComponentIndex = components[grandParentId].children.findIndex(
      (child) => child.id === components[parentId].id
    );
    if (parentComponentIndex === -1) return;

    // add the component to the children array of the grandparent component above the parent component
    components[grandParentId].children.splice(
      parentComponentIndex,
      0,
      components[parentId].children.splice(
        components[parentId].children.findIndex((child) => child.id === id),
        1
      )[0]
    );

    //update the parent of the component
    components[id].parent = components[grandParentId].id;

    // Update the state
    setComponents({ ...components });
  };

  // function to move a component to the level of its first child of its next sibling
  const moveComponentToChildLevel = (id: string) => {
    // find parent id
    const parentId = components[id].parent;

    if (!parentId) return;

    // Find the index of the component in the children array of the parent component
    const childIndex = components[parentId].children.findIndex(
      (child) => child.id === id
    );
    if (childIndex === -1) return;

    // check if the component is the last child of the parent component
    if (childIndex === components[parentId].children.length - 1) return;

    // get the next sibling id
    const nextSiblingId = components[parentId].children[childIndex + 1].id;

    // add the component to the start of children array of the next sibling component
    components[nextSiblingId].children.unshift(
      components[parentId].children.splice(childIndex, 1)[0]
    );

    //update the parent of the component
    components[id].parent = nextSiblingId;

    // Update the state
    setComponents({ ...components });
  };

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
          id={"1"}
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
          id={"1"}
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
          components={components}
          selectedComponent={components[activeId]}
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
