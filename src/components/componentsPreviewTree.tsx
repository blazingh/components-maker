import { TreeComponent } from "@/app/edit/page";

interface ComponentsPreviewTreeProps {
  components: TreeComponent[];
  id: number;
  activeId: number;
}

export default function ComponentsPreviewTree({
  components,
  id,
  activeId,
}: ComponentsPreviewTreeProps) {
  const component = components.find((c) => c.id === id);

  if (!component) return null;

  return (
    <div
      style={component.style}
      className={activeId === id ? "outline outline-primary" : ""}
    >
      {component.content && component.content}

      {component.children.map((child) => (
        <ComponentsPreviewTree
          activeId={activeId}
          key={child.id}
          id={child.id}
          components={components}
        />
      ))}
    </div>
  );
}
