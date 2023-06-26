import { ButtonBlockItem, ButtonUtils } from "@/types/types";
import { InputWithLabel } from "../inputs/inputWithLabel";

interface ButtonContentProps {
  selectedBlock: ButtonBlockItem;
  buttonUtils: ButtonUtils;
}

export function ButtonContent({
  selectedBlock,
  buttonUtils,
}: ButtonContentProps) {
  return (
    <div className="flex flex-col w-full h-full gap-y-2">
      {/* input to change the name of the block */}
      <InputWithLabel
        label="Name"
        placeholder="Name"
        type="text"
        value={selectedBlock?.name || ""}
        onChange={(e: any) => buttonUtils.updateName(e.target.value)}
      />

      {/* input to change the button text */}
      <InputWithLabel
        label="Button Text"
        placeholder="Button Text"
        type="text"
        value={selectedBlock?.text || ""}
        onChange={(e: any) => buttonUtils.updateText(e.target.value)}
      />

      {/* input to change the button onClickFunctionKey */}
      <InputWithLabel
        label="Button Function Key"
        placeholder="Button Function Key"
        type="text"
        value={selectedBlock?.onClickFunctionKey || ""}
        onChange={(e: any) =>
          buttonUtils.updateOnClickFunctionKey(e.target.value)
        }
      />
    </div>
  );
}
