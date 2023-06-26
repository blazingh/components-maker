import { ComponentStylePropritiesOptions } from "@/constants/objects";
import { InputSelection } from "../inputs/inputSelection";
import { InputWithLabel } from "../inputs/inputWithLabel";
import { ImageBlockItem, ImageUtils } from "@/types/types";

interface ImageContentProps {
  selectedBlock: ImageBlockItem;
  imageUtils: ImageUtils;
}

export default function ImageContent({
  selectedBlock,
  imageUtils,
}: ImageContentProps) {
  return (
    <div className="flex flex-col w-full h-full gap-y-2">
      {/* input to change the name of the block */}
      <InputWithLabel
        label="Name"
        placeholder="Name"
        type="text"
        value={selectedBlock?.name || ""}
        onChange={(e: any) => imageUtils.updateName(e.target.value)}
      />

      {/* input to change the image src */}
      <InputWithLabel
        label="Image Src"
        placeholder="Image Src"
        type="text"
        value={selectedBlock?.src || ""}
        onChange={(e: any) => imageUtils.updateSrc(e.target.value)}
      />

      {/* input to change the image all */}
      <InputWithLabel
        label="Image Alt"
        placeholder="Image Alt"
        type="text"
        value={selectedBlock?.alt || ""}
        onChange={(e: any) => imageUtils.updateAlt(e.target.value)}
      />

      {/* input to change the object fit */}
      <InputSelection
        label="Object Fit"
        value={
          selectedBlock?.style.objectFit ||
          ComponentStylePropritiesOptions.objectFit[0].value
        }
        onValueChange={(e: any) => imageUtils.updateStyle("objectFit", e)}
        proprities={ComponentStylePropritiesOptions.objectFit}
      />
    </div>
  );
}
