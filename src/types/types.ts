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
  selectedVersion: number;
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
  updateTextWrapper: (id: string, wrapper: TextBlockWrapper) => void;
  updateTextStyle: (id: string, attr: string, value: any) => void;
  updateTextType: (id: string, type: TextBlockType) => void;
  addLocalizedText: (id: string, locale: Locales) => void;
  removeLocalizedText: (id: string, locale: Locales) => void;
  updateLocalizedTextContent: (
    id: string,
    locale: Locales,
    text: string
  ) => void;
}

export interface ImageUtils {
  addImage: (parentId: string) => void;
  removeImage: (id: string) => void;
  updateImageName: (id: string, name: string) => void;
  updateImageSrc: (id: string, src: string) => void;
  updateImageAlt: (id: string, alt: string) => void;
  updateImageStyle: (id: string, attr: string, value: any) => void;
}

export interface ButtonUtils {
  addButton: (parentId: string) => void;
  removeButton: (id: string) => void;
  updateButtonName: (id: string, name: string) => void;
  updateButtonText: (id: string, text: string) => void;
  updateButtonStyle: (id: string, attr: string, value: any) => void;
  updateButtonOnClickFunctionKey: (id: string, key: string) => void;
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
  version_name: string;
  component: number;
  data: BlocksTree;
}
