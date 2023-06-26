import {
  Locales,
  TextBlockItem,
  TextBlockType,
  TextBlockWrapper,
  TextUtils,
} from "@/types/types";
import { MinusIcon } from "lucide-react";
import { InputWithLabel } from "../inputs/inputWithLabel";
import { PlusIcon } from "lucide-react";
import TooltipButton from "../ui/tooltipButton";
import { InputSelection } from "../inputs/inputSelection";
import { useState } from "react";

interface TextContentProps {
  selectedBlock: TextBlockItem;
  textUtils: TextUtils;
}

const locales = Object.keys(Locales).map((key) => ({
  label: key,
  value: Locales[key as keyof typeof Locales],
}));

const textTypes = Object.keys(TextBlockType).map((key) => ({
  label: key,
  value: TextBlockType[key as keyof typeof TextBlockType],
}));

const textWrappers = Object.keys(TextBlockWrapper).map((key) => ({
  label: key,
  value: TextBlockWrapper[key as keyof typeof TextBlockWrapper],
}));

export function TextContent({ selectedBlock, textUtils }: TextContentProps) {
  const [locale, setLocale] = useState<Locales>(Locales.En);

  return (
    <div className="flex flex-col w-full h-full gap-y-2">
      {/* input to change the name of the block */}

      {/* input to change the text wrappers  */}
      <InputSelection
        label="Text Wrapper"
        value={selectedBlock?.wrapper || textWrappers[0].value}
        onValueChange={(e: TextBlockWrapper) => textUtils.updateWrapper(e)}
        proprities={textWrappers}
      />

      {/* input to change the text type  */}
      <InputSelection
        label="Text Type"
        value={selectedBlock?.textType || textTypes[0].value}
        onValueChange={(e: TextBlockType) => textUtils.updateType(e)}
        proprities={textTypes}
      />

      {/* if the text is not local variable*/}
      {selectedBlock?.textType !== TextBlockType.Localized && (
        <InputWithLabel
          label={selectedBlock?.textType || "Text"}
          placeholder={selectedBlock?.textType || "Text"}
          type="text"
          value={selectedBlock?.text || ""}
          onChange={(e: any) => textUtils.updateContent(e.target.value)}
        />
      )}

      {/* add a new localized text */}
      {selectedBlock?.textType === TextBlockType.Localized && (
        <div className="flex items-end justify-end gap-x-2">
          <InputSelection
            label="Add Locale"
            value={locale}
            onValueChange={(value) => {
              setLocale(value as Locales);
            }}
            proprities={locales}
          />
          <TooltipButton
            onClick={() => {
              if (locale) {
                textUtils.addLocalized(locale);
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
        Object.keys(selectedBlock?.localizedText || {}).map((locale, index) => (
          <div key={index} className="flex items-end gap-x-2">
            <InputWithLabel
              label={locale}
              placeholder={locale}
              type="text"
              value={selectedBlock?.localizedText[locale as Locales] || ""}
              onChange={(e: any) =>
                textUtils.updateLocalizedContent(
                  locale as Locales,
                  e.target.value
                )
              }
            />
            <TooltipButton
              onClick={() => textUtils.removeLocalized(locale as Locales)}
              tooltipText="remove localized text"
            >
              <MinusIcon className="h-4 w-4" />
            </TooltipButton>
          </div>
        ))}
    </div>
  );
}
