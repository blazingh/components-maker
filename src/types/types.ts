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

export enum ComponentTextWrapper {
  P = "p",
  Span = "span",
  Div = "div",
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
}

export enum ComponentTextType {
  Text = "text",
  Key = "key",
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
  wrapper: ComponentTextWrapper;
  textType: ComponentTextType;
  text: string;
  data?: { [key: string]: any };
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
  | LocalizedComponentItem
  | ImageComponentItem
  | ComponentComponentItem;

export interface ComponentsTree {
  [key: string]: ComponentItem;
}
