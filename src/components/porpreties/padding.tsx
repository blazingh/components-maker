import InputWithUnit from "../inputs/inputWithUnit";

interface PaddingProps {
  styles: any;
  setStyles: (attr: string, value: any) => void;
}

export default function Padding({ styles, setStyles }: PaddingProps) {
  return (
    <div>
      {/* input to set the padding of the element */}
      <InputWithUnit
        label="Padding Top"
        placeholder=""
        value={styles?.paddingTop || "initial"}
        onChange={(value: any) => setStyles("paddingTop", value || "initial")}
      />

      <InputWithUnit
        label="Padding Bottom"
        placeholder=""
        value={styles?.paddingBottom || "initial"}
        onChange={(value: any) =>
          setStyles("paddingBottom", value || "initial")
        }
      />

      <InputWithUnit
        label="Padding Left"
        placeholder=""
        value={styles?.paddingLeft || "initial"}
        onChange={(value: any) => setStyles("paddingLeft", value || "initial")}
      />

      <InputWithUnit
        label="Padding Right"
        placeholder=""
        value={styles?.paddingRight || "initial"}
        onChange={(value: any) => setStyles("paddingRight", value || "initial")}
      />
    </div>
  );
}
