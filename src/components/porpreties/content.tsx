import {
  ComponentContentType,
  ComponentItem,
  ComponentTextType,
  ComponentTextWrapper,
  ComponentsTree,
  Locales,
  TextUtils,
} from "@/types/types";
import React from "react";
import TooltipButton from "../ui/tooltipButton";
import { MinusIcon, PlusIcon } from "lucide-react";
import { InputSelection } from "../inputs/inputSelection";
import { InputWithLabel } from "../inputs/inputWithLabel";

// get proprities from ComponentContentType
const contentTypes = Object.keys(ComponentContentType).map((key) => ({
  label: key,
  value: ComponentContentType[key as keyof typeof ComponentContentType],
}));

// get texttypes from ComponentTextType
const textTypes = Object.keys(ComponentTextType).map((key) => ({
  label: key,
  value: ComponentTextType[key as keyof typeof ComponentTextType],
}));

// get text wrappers from ComponentTextWrapper
const textWrappers = Object.keys(ComponentTextWrapper).map((key) => ({
  label: key,
  value: ComponentTextWrapper[key as keyof typeof ComponentTextWrapper],
}));

// get the localized text from LOcales
const locales = Object.keys(Locales).map((key) => ({
  label: key,
  value: Locales[key as keyof typeof Locales],
}));

interface ContentProps {
  components: ComponentsTree;
  selectedComponent?: ComponentItem;
  textUtils: TextUtils;
  addComponent: (parent: string, type: ComponentContentType) => void;
}

export function Content({
  components,
  selectedComponent,
  textUtils,
  addComponent,
}: ContentProps) {
  const [selectedType, setSelectedType] = React.useState<ComponentContentType>(
    contentTypes[0].value
  );

  const [selectedLocale, setSelectedLocale] = React.useState<Locales>(
    Locales.En
  );

  if (!selectedComponent) {
    return <div>select a component</div>;
  }

  // if the selected component is a text component
  if (selectedComponent.type === ComponentContentType.Text) {
    return (
      <div className="flex flex-col w-full h-full gap-y-2">
        {/* input to change the text wrappers of a component */}
        <InputSelection
          label="Text Wrapper"
          value={selectedComponent?.wrapper || textWrappers[0].value}
          onValueChange={(e: ComponentTextWrapper) =>
            textUtils.updateTextWrapper(selectedComponent.id, e)
          }
          proprities={textWrappers}
        />

        {/* input to change the text type of a component */}
        <InputSelection
          label="Text Type"
          value={selectedComponent?.textType || textTypes[0].value}
          onValueChange={(e: ComponentTextType) =>
            textUtils.updateTextType(selectedComponent.id, e)
          }
          proprities={textTypes}
        />

        {/* if the text is not local variable*/}
        {selectedComponent?.textType !== ComponentTextType.Localized && (
          <InputWithLabel
            label={selectedComponent?.textType || "Text"}
            placeholder={selectedComponent?.textType || "Text"}
            type="text"
            value={selectedComponent?.text || ""}
            onChange={(e: any) =>
              textUtils.updateTextContent(selectedComponent.id, e.target.value)
            }
          />
        )}

        {/* add a new localized text */}
        {selectedComponent?.textType === ComponentTextType.Localized && (
          <div className="flex items-end justify-end gap-x-2">
            <InputSelection
              label="Add Locale"
              value={selectedLocale}
              onValueChange={(value) => {
                setSelectedLocale(value as Locales);
              }}
              proprities={locales}
            />
            <TooltipButton
              onClick={() => {
                if (selectedLocale) {
                  textUtils.addLocalizedText(
                    selectedComponent.id,
                    selectedLocale
                  );
                }
              }}
              tooltipText="add a new localized text"
            >
              <PlusIcon className="h-4 w-4" />
            </TooltipButton>
          </div>
        )}

        {/* if the text is a local variable*/}
        {selectedComponent?.textType === ComponentTextType.Localized &&
          Object.keys(selectedComponent?.localizedText || {}).map(
            (locale, index) => (
              <div key={index} className="flex items-end gap-x-2">
                <InputWithLabel
                  label={locale}
                  placeholder={locale}
                  type="text"
                  value={
                    selectedComponent?.localizedText[locale as Locales] || ""
                  }
                  onChange={(e: any) =>
                    textUtils.updateLocalizedTextContent(
                      selectedComponent.id,
                      locale as Locales,
                      e.target.value
                    )
                  }
                />
                <TooltipButton
                  onClick={() =>
                    textUtils.removeLocalizedText(
                      selectedComponent.id,
                      locale as Locales
                    )
                  }
                  tooltipText="remove localized text"
                >
                  <MinusIcon className="h-4 w-4" />
                </TooltipButton>
              </div>
            )
          )}
      </div>
    );
  }

  // if the selected component is a container
  if (selectedComponent.type === ComponentContentType.Container) {
    return (
      <div className="flex flex-col w-full h-full gap-y-2">
        {/* list all the children of the selected component */}
        {selectedComponent.children.map((child) => {
          const component = components[child];
          return (
            <div
              key={component.id}
              className="w-full flex flex-col items-start gap-x-1
            bg-secondary rounded-md p-2"
            >
              <div className="text-xs font-bold">{component?.type}</div>
              <div className="whitespace-nowrap overflow-hidden overflow-ellipsis w-full">
                {component?.name}
              </div>
            </div>
          );
        })}
        {/* add a new component */}
        <div className="flex items-end justify-end gap-x-2">
          <InputSelection
            label="Add a new child"
            value={selectedType}
            onValueChange={(value) => {
              setSelectedType(value as ComponentContentType);
            }}
            proprities={contentTypes}
          />
          <TooltipButton
            onClick={() => {
              if (selectedType) {
                addComponent(selectedComponent.id, selectedType);
              }
            }}
            tooltipText="add a new child component to the selected component"
          >
            <PlusIcon className="h-4 w-4" />
          </TooltipButton>
        </div>
      </div>
    );
  }
}
