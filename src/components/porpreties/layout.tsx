import { ComponentStylePropritiesOptions } from "@/constants/objects";
import InputWithUnit from "../inputs/inputWithUnit";
import { InputSelection } from "../inputs/inputSelection";

interface LayoutProps {
  styles: any;
  setStyles: (attr: string, value: any) => void;
}

export default function Layout({ styles, setStyles }: LayoutProps) {
  return (
    <div>
      {/* input to set the overflow of the element */}
      <InputSelection
        label="Overflow"
        value={styles?.overflow || "initial"}
        onValueChange={(value: any) =>
          setStyles("overflow", value || "initial")
        }
        proprities={ComponentStylePropritiesOptions.overflow}
      />
      {/* input to set the display of the element */}
      <InputSelection
        label="display"
        value={styles?.display || "initial"}
        onValueChange={(value: any) => setStyles("display", value || "initial")}
        proprities={ComponentStylePropritiesOptions.display}
      />
      {/* if the display is flex, show the flex layout inputs */}
      {styles?.display === "flex" && (
        <FlexLayout styles={styles} setStyles={setStyles} />
      )}
    </div>
  );
}

interface FlexLayoutProps {
  styles: any;
  setStyles: (attr: string, value: any) => void;
}

export function FlexLayout({ styles, setStyles }: FlexLayoutProps) {
  return (
    <div>
      {/* input to set the flex-direction of the element */}
      <InputSelection
        label="Flex Direction"
        value={styles?.flexDirection || "initial"}
        onValueChange={(value: any) =>
          setStyles("flexDirection", value || "initial")
        }
        proprities={ComponentStylePropritiesOptions.flexDirection}
      />
      {/* input to set the flex-wrap of the element */}
      <InputSelection
        label="Flex Wrap"
        value={styles?.flexWrap || "initial"}
        onValueChange={(value: any) =>
          setStyles("flexWrap", value || "initial")
        }
        proprities={ComponentStylePropritiesOptions.flexWrap}
      />
      {/* input to set the justify-content of the element */}
      <InputSelection
        label="Justify Content"
        value={styles?.justifyContent || "initial"}
        onValueChange={(value: any) =>
          setStyles("justifyContent", value || "initial")
        }
        proprities={ComponentStylePropritiesOptions.justifyContent}
      />
      {/* input to set the align-items of the element */}
      <InputSelection
        label="Align Items"
        value={styles?.alignItems || "initial"}
        onValueChange={(value: any) =>
          setStyles("alignItems", value || "initial")
        }
        proprities={ComponentStylePropritiesOptions.alignItems}
      />
      {/* input to set the row-gap of the element */}
      <InputWithUnit
        label="Row Gap"
        placeholder="0"
        value={styles?.rowGap || "initial"}
        onChange={(value: string) => setStyles("rowGap", value || "initial")}
      />
      {/* input to set the column-gap of the element */}
      <InputWithUnit
        label="Column Gap"
        placeholder="0"
        value={styles?.columnGap || "initial"}
        onChange={(value: string) => setStyles("columnGap", value || "initial")}
      />
    </div>
  );
}
