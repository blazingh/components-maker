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

export interface Settings {
  showOutline: boolean;
  activeId: string;
  selectedVersion: number;
}

export interface VersionUtils {
  addVersion: (versionNumber: number, duplicati?: boolean) => Promise<void>;
  deleteVersion: () => Promise<void>;
  updateVersionNumber: (
    versionId: number,
    versionNumber: number
  ) => Promise<void>;
  updateVersionData: () => Promise<void>;
}

export interface SettingsUtils {
  toggleOutline: (vale?: boolean) => void;
  setActiveId: (id: string) => void;
  setSelectedVersion: (version: number) => void;
}

export interface ContainerUtils {
  addContainer: (parentId: string) => void;
  removeContainer: (id: string) => void;
  updateContainerName: (id: string, name: string) => void;
  updateContainerStyle: (id: string, attr: string, value: any) => void;
  changeChildPosition: (id: string, delta: number) => void;
  removeChild: (id: string) => void;
}

export interface TextUtils {
  addText: (parentId: string) => void;
  removeText: (id: string) => void;
  updateTextName: (id: string, name: string) => void;
  updateTextContent: (id: string, text: string) => void;
  updateTextWrapper: (id: string, wrapper: ComponentTextWrapper) => void;
  updateTextStyle: (id: string, attr: string, value: any) => void;
  updateTextType: (id: string, type: ComponentTextType) => void;
  addLocalizedText: (id: string, locale: Locales) => void;
  removeLocalizedText: (id: string, locale: Locales) => void;
  updateLocalizedTextContent: (
    id: string,
    locale: Locales,
    text: string
  ) => void;
}

export interface DtoComponentItem {
  id: number;
  name: string;
  live_version: number;
  demo_version: number;
}

export interface DtoVersionItem {
  id: number;
  version: number;
  component: number;
  data: ComponentsTree;
}
