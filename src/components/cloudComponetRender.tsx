import {
  BlockContentType,
  BlocksTree,
  DtoComponentItem,
  DtoVersionItem,
  Locales,
  TextBlockType,
  TextBlockWrapper,
} from "@/types/types";

interface CloudComponentRenderProps {
  component: DtoComponentItem;
  version: DtoVersionItem;
  data?: { [key: string]: any };
}

export default function CloudComponentRender({
  component,
  version,
  data,
}: CloudComponentRenderProps) {
  return (
    <div>
      <BlocksRenderTree id="1" blocks={version.data} data={data} />
    </div>
  );
}

interface BlockRenderTreeProps {
  blocks: BlocksTree;
  id: string;
  data?: { [key: string]: any };
}

export function BlocksRenderTree({ blocks, id, data }: BlockRenderTreeProps) {
  const block = blocks[id];

  if (!block) return null;

  // when block is a text
  if (block.type === BlockContentType.Text) {
    let content = block.text;

    if (block.textType === TextBlockType.Key)
      content = data?.[block.text] || block.text;

    if (block.textType === TextBlockType.Localized) {
      const locale = (data?.locale as Locales) || ("en" as Locales);
      content = block.localizedText?.[locale] || block.text;
    }

    if (block.wrapper === TextBlockWrapper.Div)
      return <div style={block.style}>{content}</div>;

    if (block.wrapper === TextBlockWrapper.Span)
      return <span style={block.style}>{content}</span>;

    if (block.wrapper === TextBlockWrapper.H1)
      return <h1 style={block.style}>{content}</h1>;

    if (block.wrapper === TextBlockWrapper.H2)
      return <h2 style={block.style}>{content}</h2>;

    if (block.wrapper === TextBlockWrapper.H3)
      return <h3 style={block.style}>{content}</h3>;

    return <p style={block.style}>{content}</p>;
  }

  // when block is a container
  if (block.type === BlockContentType.Container) {
    return (
      <div style={block.style}>
        {block.children.map((child) => (
          <BlocksRenderTree
            data={data}
            key={child}
            id={child}
            blocks={blocks}
          />
        ))}
      </div>
    );
  }
}
