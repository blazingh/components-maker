export enum ComponentContentType {
  Container = "Container",
  Text = "Text",
  Key = "Key",
  Image = "Image",
  Component = "Component",
}

export enum ComponentTextWrapper {
  P = "p",
  Span = "span",
  Div = "div",
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
}

export enum Locales {
  En = "en",
  Tr = "tr",
  Ar = "ar",
}

export enum ComponentTextType {
  Text = "text",
  Key = "key",
  Localized = "localized",
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
  localizedText: {
    [key in Locales]?: string;
  };
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
  | ImageComponentItem
  | ComponentComponentItem;

export interface ComponentsTree {
  [key: string]: ComponentItem;
}
