import { BlockContentType, BlocksTree } from "@/types/types";

export const initialVersionData: BlocksTree = {
  1: {
    id: "1",
    name: "Base Block",
    type: BlockContentType.Container,
    style: {
      width: "500px",
      height: "500px",
      backgroundColor: "#fff",
    },
    parent: "root",
    children: [],
  },
};
