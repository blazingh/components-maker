import InputWithUnit from "../inputs/inputWithUnit";

interface MarginProps {
  styles: any;
  setStyles: (attr: string, value: any) => void;
}

export default function Margin({ styles, setStyles }: MarginProps) {
  return (
    <div>
      {/* input to set the margin of the element */}
      <InputWithUnit
        label="Margin Top"
        placeholder=""
        value={styles?.marginTop || "initial"}
        onChange={(value: any) => setStyles("marginTop", value || "initial")}
      />

      <InputWithUnit
        label="Margin Bottom"
        placeholder=""
        value={styles?.marginBottom || "initial"}
        onChange={(value: any) => setStyles("marginBottom", value || "initial")}
      />

      <InputWithUnit
        label="Margin Left"
        placeholder=""
        value={styles?.marginLeft || "initial"}
        onChange={(value: any) => setStyles("marginLeft", value || "initial")}
      />

      <InputWithUnit
        label="Margin Right"
        placeholder=""
        value={styles?.marginRight || "initial"}
        onChange={(value: any) => setStyles("marginRight", value || "initial")}
      />
    </div>
  );
}
