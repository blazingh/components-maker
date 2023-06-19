import { ComponentContentType, TreeComponentItem } from "@/types/types";

interface ComponentsPreviewTreeProps {
  components: TreeComponentItem[];
  id: number;
  activeId: number;
  data?: { [key: string]: any };
}

export default function ComponentsPreviewTree({
  components,
  id,
  activeId,
  data,
}: ComponentsPreviewTreeProps) {
  const component = components.find((c) => c.id === id);

  if (!component) return null;

  return (
    <div
      style={component.style}
      className={activeId === id ? "outline outline-primary outline-thin " : ""}
    >
      {component.content?.type === ComponentContentType.Text && (
        <div style={component.content?.style}>
          {component.content?.text || ""}
        </div>
      )}

      {component.content?.type === ComponentContentType.Key && (
        <div style={component.content?.style}>
          {data?.[component.content?.key || ""] || ""}
        </div>
      )}

      {component.children.map((child) => (
        <ComponentsPreviewTree
          data={data}
          activeId={activeId}
          key={child.id}
          id={child.id}
          components={components}
        />
      ))}
    </div>
  );
}
