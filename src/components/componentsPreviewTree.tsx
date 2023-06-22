import {
  ComponentContentType,
  ComponentTextType,
  ComponentTextWrapper,
  ComponentsTree,
} from "@/types/types";

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
    const props = {
      style: component.style,
      className: activeId === id ? "outline outline-primary outline-thin " : "",
    };

    const content =
      component.textType === ComponentTextType.Key
        ? data?.[component.text] || component.text
        : component.text;

    if (component.wrapper === ComponentTextWrapper.Div)
      return <div {...props}>{content}</div>;

    if (component.wrapper === ComponentTextWrapper.Span)
      return <span {...props}>{content}</span>;

    if (component.wrapper === ComponentTextWrapper.H1)
      return <h1 {...props}>{content}</h1>;

    if (component.wrapper === ComponentTextWrapper.H2)
      return <h2 {...props}>{content}</h2>;

    if (component.wrapper === ComponentTextWrapper.H3)
      return <h3 {...props}>{content}</h3>;

    return <p {...props}>{content}</p>;
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
