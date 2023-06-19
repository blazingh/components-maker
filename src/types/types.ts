export enum ComponentContentType {
  Container = "Container",
  Text = "Text",
  Key = "Key",
  Image = "Image",
  Component = "Component",
}

export interface ComponentContent {
  type: ComponentContentType;
  text?: string;
  image?: string;
  component?: string;
  data?: { [key: string]: any };
  style?: React.CSSProperties;
}

export interface TreeComponentItem {
  id: number;
  name: string;
  style: React.CSSProperties;
  parent?: number;
  content?: content;
  children: { id: number }[];
}
