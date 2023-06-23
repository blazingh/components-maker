import { ComponentStylePropritiesOptions } from "@/constants/objects";
import { Input } from "../ui/input";
import { InputSelection } from "../inputs/inputSelection";
import InputWithUnit from "../inputs/inputWithUnit";

interface SizeProps {
  styles: any;
  setStyles: (atr: any, value: any) => void;
}

export default function Size({ styles, setStyles }: SizeProps) {
  // { value: "input", label: "input" },
  const hasComponentWidth = ComponentStylePropritiesOptions.size.find(
    (item) => item.value === styles?.width
  );

  const hasComponentHeight = ComponentStylePropritiesOptions.size.find(
    (item) => item.value === styles?.height
  );

  return (
    <div className="flex flex-col gap-2">
      <div>
        {/* select input to choose the width of a component */}
        <InputSelection
          label="Width"
          value={
            hasComponentWidth
              ? styles?.width
              : ComponentStylePropritiesOptions.size[1].value
          }
          onValueChange={(value) =>
            setStyles(
              "width",
              value === ComponentStylePropritiesOptions.size[0].value
                ? "100px"
                : value
            )
          }
          proprities={ComponentStylePropritiesOptions.size}
        />
        {/* input to set the width of a component */}
        <InputWithUnit
          placeholder="width"
          value={styles?.width || ComponentStylePropritiesOptions.size[0].value}
          onChange={(value: string) =>
            setStyles(
              "width",
              value || ComponentStylePropritiesOptions.size[0].value
            )
          }
        />
      </div>
      <div>
        {/* select input to choose the height of a component */}
        <InputSelection
          label="Height"
          value={
            hasComponentHeight
              ? styles?.height
              : ComponentStylePropritiesOptions.size[1].value
          }
          onValueChange={(value) =>
            setStyles(
              "height",
              value === ComponentStylePropritiesOptions.size[0].value
                ? "100px"
                : value
            )
          }
          proprities={ComponentStylePropritiesOptions.size}
        />
        {/* input to set the height of a component */}
        <InputWithUnit
          placeholder="height"
          value={
            styles?.height || ComponentStylePropritiesOptions.size[0].value
          }
          onChange={(value: string) =>
            setStyles(
              "height",
              value || ComponentStylePropritiesOptions.size[0].value
            )
          }
        />
      </div>
    </div>
  );
}
