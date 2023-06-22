import InputWithColor from "../inputs/inputWithColor";

interface BackgroundProps {
  styles: any;
  setStyles: (attr: string, value: any) => void;
}

export default function Background({ styles, setStyles }: BackgroundProps) {
  return (
    <div>
      {/* input to set the background color of the element */}
      <InputWithColor
        label="Background Color"
        value={styles?.backgroundColor || "initial"}
        onChange={(value: any) =>
          setStyles("backgroundColor", value || "initial")
        }
      />
    </div>
  );
}
