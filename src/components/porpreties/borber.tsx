import { ComponentStylePropritiesOptions } from "@/constants/objects";
import { PropritySelector } from "../componentsEditBar";
import InputWithUnit from "../inputs/inputWithUnit";
import InputWithColor from "../inputs/inputWithColor";

interface BorderProps {
  styles: any;
  setStyles: (attr: string, value: any) => void;
}

export default function Border({ styles, setStyles }: BorderProps) {
  return (
    <div>
      {/* input to set the border of the element */}
      <PropritySelector
        label="Border Style"
        value={styles?.border || "initial"}
        onValueChange={(value: any) =>
          setStyles("borderStyle", value || "initial")
        }
        proprities={ComponentStylePropritiesOptions.borderStyle}
      />
      {/* input to set the border width of the element */}
      <InputWithUnit
        label="Border Width"
        placeholder=""
        value={styles?.borderWidth || "initial"}
        onChange={(value: any) => setStyles("borderWidth", value || "initial")}
      />
      {/* input to set the border color of the element */}
      <InputWithColor
        label="Border Color"
        value={styles?.borderColor || "initial"}
        onChange={(value: any) => setStyles("borderColor", value || "initial")}
      />
      {/* input to set the border radius of the element */}
      <InputWithUnit
        label="Border Radius"
        placeholder=""
        value={styles?.borderRadius || "initial"}
        onChange={(value: any) => setStyles("borderRadius", value || "initial")}
      />
    </div>
  );
}
