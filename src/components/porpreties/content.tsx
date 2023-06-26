import {
  BlockContentType,
  BlockItem,
  BlocksTree,
  ImageUtils,
  Locales,
  TextBlockType,
  TextBlockWrapper,
  TextUtils,
} from "@/types/types";
import React from "react";
import TooltipButton from "../ui/tooltipButton";
import { MinusIcon, PlusIcon } from "lucide-react";
import { InputSelection } from "../inputs/inputSelection";
import { InputWithLabel } from "../inputs/inputWithLabel";
import { ComponentStylePropritiesOptions } from "@/constants/objects";
import Background from "./background";

// get proprities from BlockContentType
const contentTypes = Object.keys(BlockContentType).map((key) => ({
  label: key,
  value: BlockContentType[key as keyof typeof BlockContentType],
}));

// get texttypes from TextBlockType
const textTypes = Object.keys(TextBlockType).map((key) => ({
  label: key,
  value: TextBlockType[key as keyof typeof TextBlockType],
}));

// get text wrappers from TextBlockWrapper
const textWrappers = Object.keys(TextBlockWrapper).map((key) => ({
  label: key,
  value: TextBlockWrapper[key as keyof typeof TextBlockWrapper],
}));

// get the localized text from LOcales
const locales = Object.keys(Locales).map((key) => ({
  label: key,
  value: Locales[key as keyof typeof Locales],
}));

interface ContentProps {
  blocks: BlocksTree;
  selectedBlock: BlockItem;
  textUtils: TextUtils;
  imageUtils: ImageUtils;
  addBlock: (parent: string, type: BlockContentType) => void;
}

export function Content({
  blocks,
  selectedBlock,
  textUtils,
  addBlock,
  imageUtils,
}: ContentProps) {
  const [selectedType, setSelectedType] = React.useState<BlockContentType>(
    contentTypes[0].value
  );

  const [selectedLocale, setSelectedLocale] = React.useState<Locales>(
    Locales.En
  );

  if (!selectedBlock) {
    return <div>select a component</div>;
  }

  // if the selected component is a text component
  if (selectedBlock.type === BlockContentType.Text) {
    return (
      <div className="flex flex-col w-full h-full gap-y-2">
        {/* input to change the text wrappers of a component */}
        <InputSelection
          label="Text Wrapper"
          value={selectedBlock?.wrapper || textWrappers[0].value}
          onValueChange={(e: TextBlockWrapper) =>
            textUtils.updateTextWrapper(selectedBlock.id, e)
          }
          proprities={textWrappers}
        />

        {/* input to change the text type of a component */}
        <InputSelection
          label="Text Type"
          value={selectedBlock?.textType || textTypes[0].value}
          onValueChange={(e: TextBlockType) =>
            textUtils.updateTextType(selectedBlock.id, e)
          }
          proprities={textTypes}
        />

        {/* if the text is not local variable*/}
        {selectedBlock?.textType !== TextBlockType.Localized && (
          <InputWithLabel
            label={selectedBlock?.textType || "Text"}
            placeholder={selectedBlock?.textType || "Text"}
            type="text"
            value={selectedBlock?.text || ""}
            onChange={(e: any) =>
              textUtils.updateTextContent(selectedBlock.id, e.target.value)
            }
          />
        )}

        {/* add a new localized text */}
        {selectedBlock?.textType === TextBlockType.Localized && (
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
                  textUtils.addLocalizedText(selectedBlock.id, selectedLocale);
                }
              }}
              tooltipText="add a new localized text"
            >
              <PlusIcon className="h-4 w-4" />
            </TooltipButton>
          </div>
        )}

        {/* if the text is a local variable*/}
        {selectedBlock?.textType === TextBlockType.Localized &&
          Object.keys(selectedBlock?.localizedText || {}).map(
            (locale, index) => (
              <div key={index} className="flex items-end gap-x-2">
                <InputWithLabel
                  label={locale}
                  placeholder={locale}
                  type="text"
                  value={selectedBlock?.localizedText[locale as Locales] || ""}
                  onChange={(e: any) =>
                    textUtils.updateLocalizedTextContent(
                      selectedBlock.id,
                      locale as Locales,
                      e.target.value
                    )
                  }
                />
                <TooltipButton
                  onClick={() =>
                    textUtils.removeLocalizedText(
                      selectedBlock.id,
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

  // if the selected component is an image component
  if (selectedBlock.type === BlockContentType.Image) {
    return (
      <div className="flex flex-col w-full h-full gap-y-2">
        {/* input to change the image src of a component */}
        <InputWithLabel
          label="Image Src"
          placeholder="Image Src"
          type="text"
          value={selectedBlock?.src || ""}
          onChange={(e: any) =>
            imageUtils.updateImageSrc(selectedBlock.id, e.target.value)
          }
        />

        {/* input to change the image alt of a component */}
        <InputWithLabel
          label="Image Alt"
          placeholder="Image Alt"
          type="text"
          value={selectedBlock?.alt || ""}
          onChange={(e: any) =>
            imageUtils.updateImageAlt(selectedBlock.id, e.target.value)
          }
        />

        {/* input to change the object fit of a component */}
        <InputSelection
          label="Object Fit"
          value={
            selectedBlock?.style.objectFit ||
            ComponentStylePropritiesOptions.objectFit[0].value
          }
          onValueChange={(e: any) =>
            imageUtils.updateImageStyle(selectedBlock.id, "objectFit", e)
          }
          proprities={ComponentStylePropritiesOptions.objectFit}
        />
      </div>
    );
  }

  // if the selected component is a container
  if (selectedBlock.type === BlockContentType.Container) {
    return (
      <div className="flex flex-col w-full h-full gap-y-2">
        {/* list all the children of the selected component */}
        {selectedBlock.children.map((child) => {
          const block = blocks[child];
          return (
            <div
              key={block.id}
              className="w-full flex flex-col items-start gap-x-1
            bg-secondary rounded-md p-2"
            >
              <div className="text-xs font-bold">{block?.type}</div>
              <div className="whitespace-nowrap overflow-hidden overflow-ellipsis w-full">
                {block?.name}
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
              setSelectedType(value as BlockContentType);
            }}
            proprities={contentTypes}
          />
          <TooltipButton
            onClick={() => {
              if (selectedType) {
                addBlock(selectedBlock.id, selectedType);
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
