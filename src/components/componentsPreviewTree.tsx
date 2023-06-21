import { ComponentContentType, ComponentsTree } from "@/types/types";

interface ComponentsPreviewTreeProps {
  components: ComponentsTree;
  id: string;
  activeId: string;
  data?: { [key: string]: any };
}

export default function ComponentsPreviewTree({
  components,
  id,
  activeId,
  data,
}: ComponentsPreviewTreeProps) {
  const component = components[id];

  if (!component) return null;

  // when component is a text
  if (component.type === ComponentContentType.Text) {
    return (
      <p
        style={component.style}
        className={
          activeId === id ? "outline outline-primary outline-thin " : ""
        }
      >
        {component.text}
      </p>
    );
  }

  // when component is a key data value
  if (component.type === ComponentContentType.Key) {
    return (
      <p
        style={component.style}
        className={
          activeId === id ? "outline outline-primary outline-thin " : ""
        }
      >
        {data?.[component.key]}
      </p>
    );
  }

  // when component is a localized text
  if (component.type === ComponentContentType.Localized) {
    return (
      <p
        style={component.style}
        className={
          activeId === id ? "outline outline-primary outline-thin " : ""
        }
      >
        {component.data[data?.locale || "en"]}
      </p>
    );
  }

  // when component is a container
  if (component.type === ComponentContentType.Container) {
    return (
      <div
        style={component.style}
        className={
          activeId === id ? "outline outline-primary outline-thin " : ""
        }
      >
        {component.children.map((child) => (
          <ComponentsPreviewTree
            data={data}
            activeId={activeId}
            key={child}
            id={child}
            components={components}
          />
        ))}
      </div>
    );
  }
}
