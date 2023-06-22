import { ComponentStylePropritiesOptions } from "@/constants/objects";
import { PropritySelector } from "../componentsEditBar";
import { Input } from "../ui/input";

interface SizeProps {
  styles: any;
  setStyles: (atr: any, value: any) => void;
}

export default function Size({ styles, setStyles }: SizeProps) {
  return (
    <div>
      {/* select input to choose the width and height of a component */}
      <div className="flex gap-x-2">
        {/* select input to choose the width of a component */}
        <PropritySelector
          label="Width"
          value={
            typeof styles?.width === "number"
              ? "input"
              : styles?.width || "input"
          }
          onValueChange={(value) =>
            setStyles("width", value === "static" ? 100 : value)
          }
          proprities={ComponentStylePropritiesOptions.size}
        />
        {/* select input to choose the height of a component */}
        <PropritySelector
          label="Height"
          value={
            typeof styles?.height === "number"
              ? "input"
              : styles?.height || "input"
          }
          onValueChange={(value) =>
            setStyles("height", value === "static" ? 100 : value)
          }
          proprities={ComponentStylePropritiesOptions.size}
        />
      </div>
      {/* input to staticly set the width and height of a component */}
      <div className="flex gap-x-2 mt-2">
        {/* input to staticly set the width of a component */}
        <Input
          disabled={typeof styles?.width !== "number"}
          type="number"
          placeholder="Width"
          className="bg-white"
          value={styles?.width || 0}
          onChange={(e) => setStyles("width", Number(e.target.value))}
        />
        {/* input to staticly set the height of a component */}
        <Input
          disabled={typeof styles?.height !== "number"}
          type="number"
          placeholder="Height"
          className="bg-white"
          value={styles?.height || 0}
          onChange={(e) => setStyles("height", Number(e.target.value))}
        />
      </div>
    </div>
  );
}
