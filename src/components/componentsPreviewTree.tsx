import {
  BlockContentType,
  BlocksTree,
  Locales,
  TextBlockType,
  TextBlockWrapper,
} from "@/types/types";

interface BlocksPreviewTreeProps {
  blocks: BlocksTree;
  id: string;
  activeBlockId: string;
  data?: { [key: string]: any };
  showOutline: boolean;
}

export default function BlocksPreviewTree({
  blocks,
  id,
  activeBlockId,
  data,
  showOutline,
}: BlocksPreviewTreeProps) {
  const block = blocks[id];

  if (!block) return null;

  // when block is a text
  if (block.type === BlockContentType.Text) {
    const props = {
      style: block.style,
      className:
        activeBlockId === id ? "outline outline-primary outline-thin " : "",
    };

    let content = block.text;

    if (block.textType === TextBlockType.Key)
      content = data?.[block.text] || block.text;

    if (block.textType === TextBlockType.Localized) {
      const locale = (data?.locale as Locales) || ("en" as Locales);
      content = block.localizedText?.[locale] || block.text;
    }

    if (block.wrapper === TextBlockWrapper.Div)
      return <div {...props}>{content}</div>;

    if (block.wrapper === TextBlockWrapper.Span)
      return <span {...props}>{content}</span>;

    if (block.wrapper === TextBlockWrapper.H1)
      return <h1 {...props}>{content}</h1>;

    if (block.wrapper === TextBlockWrapper.H2)
      return <h2 {...props}>{content}</h2>;

    if (block.wrapper === TextBlockWrapper.H3)
      return <h3 {...props}>{content}</h3>;

    return <p {...props}>{content}</p>;
  }

  const withOutlineStyle = {
    ...block.style,
    outlineColor: "white",
    outlineWidth: "1px",
    outlineStyle: "solid",
  };

  // when block is a container
  if (block.type === BlockContentType.Container) {
    return (
      <div
        style={
          activeBlockId === id && showOutline ? withOutlineStyle : block.style
        }
      >
        {block.children.map((child) => (
          <BlocksPreviewTree
            showOutline={showOutline}
            data={data}
            activeBlockId={activeBlockId}
            key={child}
            id={child}
            blocks={blocks}
          />
        ))}
      </div>
    );
  }
}
