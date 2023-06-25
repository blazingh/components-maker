import { BlockContentType, BlocksTree } from "./types/types";

// Define the initial state of components
export const initialComponents: BlocksTree = {
  1: {
    id: "1",
    name: "root",
    type: BlockContentType.Container,
    style: {
      width: "500px",
      height: "500px",
      backgroundColor: "#fff",
    },
    parent: "rott",
    children: ["2", "3"],
  },
  2: {
    id: "2",
    name: "header",
    type: BlockContentType.Container,
    style: {
      width: "50px",
      height: "50px",
      backgroundColor: "#000",
    },
    parent: "1",
    children: [],
  },
  3: {
    id: "3",
    type: BlockContentType.Container,
    name: "logo",
    style: {
      backgroundColor: "#4a4a4a",
    },
    parent: "1",
    children: ["4", "5"],
  },
  4: {
    id: "4",
    type: BlockContentType.Container,
    name: "logo",
    style: {
      width: "50px",
      height: "50px",
      backgroundColor: "#f5e",
    },
    parent: "3",
    children: [],
  },
  5: {
    id: "5",
    type: BlockContentType.Container,
    name: "logo",
    style: {
      width: "50px",
      height: "40px",
      backgroundColor: "#0f6",
    },
    parent: "3",
    children: [],
  },
};
