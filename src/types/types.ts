export enum ComponentContentType {
  Container = "Container",
  Text = "Text",
  Key = "Key",
  Localized = "Localized",
  Image = "Image",
  Component = "Component",
  H1 = "Header1",
  H2 = "Header2",
  H3 = "Header3",
}

export interface TreeComponentItem {
  id: string;
  name: string;
  style: React.CSSProperties;
  parent: string;
}

export interface ContainerComponentItem extends TreeComponentItem {
  type: ComponentContentType.Container;
  children: string[];
}

export interface TextComponentItem extends TreeComponentItem {
  type: ComponentContentType.Text;
  text: string;
}

export interface KeyComponentItem extends TreeComponentItem {
  type: ComponentContentType.Key;
  key: string;
  data: { [key: string]: any };
}

export interface LocalizedComponentItem extends TreeComponentItem {
  type: ComponentContentType.Localized;
  data: { [key: string]: any };
}

export interface ImageComponentItem extends TreeComponentItem {
  type: ComponentContentType.Image;
  src: string;
  alt: string;
}

export interface ComponentComponentItem extends TreeComponentItem {
  type: ComponentContentType.Component;
  component: string;
}

export type ComponentItem =
  | ContainerComponentItem
  | TextComponentItem
  | KeyComponentItem
  | LocalizedComponentItem
  | ImageComponentItem
  | ComponentComponentItem;

export interface ComponentsTree {
  [key: string]: ComponentItem;
}
