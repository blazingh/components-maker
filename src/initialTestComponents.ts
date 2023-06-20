import { ComponentContentType, ComponentsTree } from "./types/types";

// Define the initial state of components
export const initialComponents: ComponentsTree = {
  1: {
    id: 1,
    name: "root",
    type: ComponentContentType.Container,
    style: {
      width: 500,
      height: 500,
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
  2: {
    id: 2,
    name: "header",
    type: ComponentContentType.Container,
    style: {
      width: 50,
      height: 50,
      backgroundColor: "blue",
    },
    parent: 1,
    children: [],
  },
  3: {
    id: 3,
    type: ComponentContentType.Container,
    name: "logo",
    style: {
      width: 50,
      height: 50,
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
  4: {
    id: 4,
    type: ComponentContentType.Container,
    name: "logo",
    style: {
      width: 50,
      height: 50,
      backgroundColor: "tan",
    },
    parent: 3,
    children: [],
  },
  5: {
    id: 5,
    type: ComponentContentType.Container,
    name: "logo",
    style: {
      width: 50,
      height: 50,
      backgroundColor: "navy",
    },
    parent: 3,
    children: [],
  },
};
