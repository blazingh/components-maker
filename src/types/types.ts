export enum BlockContentType {
  Container = "Container",
  Text = "Text",
  Key = "Key",
  Image = "Image",
  Component = "Component",
  Button = "Button",
}

export enum TextBlockWrapper {
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

export enum TextBlockType {
  Text = "text",
  Key = "key",
  Localized = "localized",
}

export interface BlockTreeItem {
  id: string;
  name: string;
  style: React.CSSProperties;
  parent: string;
}

export interface ContainerBlockItem extends BlockTreeItem {
  type: BlockContentType.Container;
  children: string[];
}

export interface TextBlockItem extends BlockTreeItem {
  type: BlockContentType.Text;
  wrapper: TextBlockWrapper;
  textType: TextBlockType;
  text: string;
  localizedText: {
    [key in Locales]?: string;
  };
}

export interface ImageBlockItem extends BlockTreeItem {
  type: BlockContentType.Image;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ButtonBlockItem extends BlockTreeItem {
  type: BlockContentType.Button;
  text: string;
  onClickFunctionKey: string;
}

export interface ComponentBlockItem extends BlockTreeItem {
  type: BlockContentType.Component;
  component: string;
}

export type BlockItem =
  | ContainerBlockItem
  | TextBlockItem
  | ImageBlockItem
  | ComponentBlockItem
  | ButtonBlockItem;

export interface BlocksTree {
  [key: string]: BlockItem;
}
export interface Settings {
  showOutline: boolean;
  activeBlockId: string;
  selectedVersion: string;
}

export interface ComponentUtils {
  renameComponent: (name: string) => void;
}

export interface VersionUtils {
  addVersion: (versionName: string, duplicati?: boolean) => Promise<void>;
  deleteVersion: () => Promise<void>;
  updateVersionNumber: (versionNumber: number) => Promise<void>;
  updateVersionName: (versionName: string) => Promise<void>;
  updateVersionData: () => Promise<void>;
}

export interface SettingsUtils {
  toggleOutline: (vale?: boolean) => void;
  setActiveBlockId: (id: string) => void;
  setSelectedVersion: (version: string) => void;
}

export interface ContainerUtils {
  add: (parentId: string) => void;
  remove: (id: string) => void;
  updateName: (name: string) => void;
  updateStyle: (attr: string, value: any) => void;
  changeChildPosition: (childId: string, delta: number) => void;
  removeChild: (childId: string) => void;
}

export interface TextUtils {
  add: (parentId: string) => void;
  remove: () => void;
  updateName: (name: string) => void;
  updateContent: (text: string) => void;
  updateWrapper: (wrapper: TextBlockWrapper) => void;
  updateStyle: (attr: string, value: any) => void;
  updateType: (type: TextBlockType) => void;
  addLocalized: (locale: Locales) => void;
  removeLocalized: (locale: Locales) => void;
  updateLocalizedContent: (locale: Locales, text: string) => void;
}

export interface ImageUtils {
  add: (parentId: string) => void;
  remove: () => void;
  updateName: (name: string) => void;
  updateSrc: (src: string) => void;
  updateAlt: (alt: string) => void;
  updateStyle: (attr: string, value: any) => void;
}

export interface ButtonUtils {
  add: (parentId: string) => void;
  remove: () => void;
  updateName: (name: string) => void;
  updateText: (text: string) => void;
  updateStyle: (attr: string, value: any) => void;
  updateOnClickFunctionKey: (key: string) => void;
}

export interface DtoComponentItem {
  id: string;
  name: string;
  live_version: string;
  demo_version: string;
}

export interface DtoVersionItem {
  id: string;
  version_name: string;
  component: string;
  data: BlocksTree;
}
