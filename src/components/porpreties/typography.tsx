import { ComponentStylePropritiesOptions } from "@/constants/objects";
import InputWithUnit from "../inputs/inputWithUnit";
import InputWithColor from "../inputs/inputWithColor";
import { InputSelection } from "../inputs/inputSelection";

interface TypographyProps {
  styles: any;
  setStyles: (attr: string, value: any) => void;
}

export function Typography({ styles, setStyles }: TypographyProps) {
  return (
    <div>
      {/* input to change the font family*/}
      <InputSelection
        label="Font Family"
        value={styles?.fontFamily || "initial"}
        onValueChange={(value: any) =>
          setStyles("fontFamily", value || "initial")
        }
        proprities={ComponentStylePropritiesOptions.fontFamily}
      />
      {/* input to change the font size*/}
      <InputWithUnit
        label="Font Size"
        placeholder=""
        value={styles?.fontSize || "initial"}
        onChange={(value: string) => setStyles("fontSize", value || "initial")}
      />
      {/* input to change the font weight*/}
      <InputSelection
        label="Font Weight"
        value={styles?.fontWeight || "initial"}
        onValueChange={(value: any) =>
          setStyles("fontWeight", value || "initial")
        }
        proprities={ComponentStylePropritiesOptions.fontWeight}
      />
      {/* input to change the font style*/}
      <InputSelection
        label="Font Style"
        value={styles?.fontStyle || "initial"}
        onValueChange={(value: any) =>
          setStyles("fontStyle", value || "initial")
        }
        proprities={ComponentStylePropritiesOptions.fontStyle}
      />
      {/* input to change the text color*/}
      <InputWithColor
        label="Text Color"
        value={styles?.color || "initial"}
        onChange={(value: any) => setStyles("color", value || "initial")}
      />
      {/* input to change the text align*/}
      <InputSelection
        label="Text Align"
        value={styles?.textAlign || "initial"}
        onValueChange={(value: any) =>
          setStyles("textAlign", value || "initial")
        }
        proprities={ComponentStylePropritiesOptions.textAlign}
      />
      {/* input to change the text decoration*/}
      <InputSelection
        label="Text Decoration"
        value={styles?.textDecoration || "initial"}
        onValueChange={(value: any) =>
          setStyles("textDecoration", value || "initial")
        }
        proprities={ComponentStylePropritiesOptions.textDecoration}
      />
      {/* input to change the overflow */}
      <InputSelection
        label="Overflow"
        value={styles?.overflow || "initial"}
        onValueChange={(value: any) =>
          setStyles("overflow", value || "initial")
        }
        proprities={ComponentStylePropritiesOptions.overflow}
      />
      {/* input to change the text overflow*/}
      <InputSelection
        label="Text Overflow"
        value={styles?.textOverflow || "initial"}
        onValueChange={(value: any) =>
          setStyles("textOverflow", value || "initial")
        }
        proprities={ComponentStylePropritiesOptions.textOverflow}
      />
      {/* input to change the white space*/}
      <InputSelection
        label="White Space"
        value={styles?.whiteSpace || "initial"}
        onValueChange={(value: any) =>
          setStyles("whiteSpace", value || "initial")
        }
        proprities={ComponentStylePropritiesOptions.whiteSpace}
      />
      {/* input to change the text transform*/}
      <InputSelection
        label="Text Transform"
        value={styles?.textTransform || "initial"}
        onValueChange={(value: any) =>
          setStyles("textTransform", value || "initial")
        }
        proprities={ComponentStylePropritiesOptions.textTransform}
      />
    </div>
  );
}
