import { TreeComponent } from "./app/edit/page";

// Define the initial state of components
export const initialComponents: TreeComponent[] = [
  {
    id: 1,
    name: "root",
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
  {
    id: 2,
    name: "header",
    style: {
      width: 50,
      height: 50,
      backgroundColor: "blue",
    },
    parent: 1,
    children: [],
  },
  {
    id: 3,
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
  {
    id: 4,
    name: "logo",
    style: {
      width: 50,
      height: 50,
      backgroundColor: "tan",
    },
    parent: 3,
    children: [],
  },
  {
    id: 5,
    name: "logo",
    style: {
      width: 50,
      height: 50,
      backgroundColor: "navy",
    },
    parent: 3,
    children: [],
  },
];
