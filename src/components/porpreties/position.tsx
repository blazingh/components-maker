import { ComponentStylePropritiesOptions } from "@/constants/objects";
import { PropritySelector } from "../componentsEditBar";
import InputWithUnit from "../inputs/inputWithUnit";

interface PositionProps {
  styles: any;
  setStyles: (attr: string, value: any) => void;
}

export default function Position({ styles, setStyles }: PositionProps) {
  return (
    <div>
      {/* input to set the position of the element */}
      <PropritySelector
        label="position"
        value={styles?.position || "initial"}
        onValueChange={(value: any) =>
          setStyles("position", value || "initial")
        }
        proprities={ComponentStylePropritiesOptions.position}
      />
      {/* input to set the top of the element */}
      <InputWithUnit
        label="top"
        placeholder="top"
        value={styles?.top || "initial"}
        onChange={(value: string) => setStyles("top", value || "initial")}
      />
      {/* input to set the right of the element */}
      <InputWithUnit
        label="right"
        placeholder="right"
        value={styles?.right || "initial"}
        onChange={(value: string) => setStyles("right", value || "initial")}
      />
      {/* input to set the bottom of the element */}
      <InputWithUnit
        label="bottom"
        placeholder="bottom"
        value={styles?.bottom || "initial"}
        onChange={(value: string) => setStyles("bottom", value || "initial")}
      />
      {/* input to set the left of the element */}
      <InputWithUnit
        label="left"
        placeholder="left"
        value={styles?.left || "initial"}
        onChange={(value: string) => setStyles("left", value || "initial")}
      />
    </div>
  );
}
