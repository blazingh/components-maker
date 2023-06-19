import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface InputWithUnitProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function InputWithUnit({
  label,
  placeholder,
  value, // example: "10px"
  onChange,
}: InputWithUnitProps) {
  const units = ["unset", "px", "%", "em", "rem", "vw", "vh"];

  const number = value.slice(0, -2) || "";
  const unit = value.slice(-2) || units[0];

  const onChangeNumber = (e: any) => {
    onChange(e?.target?.value + unit);
  };

  const onChangeUnit = (e: string) => {
    if (e === "unset") return onChange(e);
    onChange(number + e);
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
      <Label htmlFor="border-radius" className="text-sm">
        {label}
      </Label>
      <div className="flex gap-1.5">
        <Input
          type="number"
          placeholder={placeholder}
          className="bg-white"
          value={number}
          onChange={onChangeNumber}
        />
        <Select value={unit || units[0]} onValueChange={onChangeUnit}>
          <SelectTrigger>
            <SelectValue placeholder={unit} />
          </SelectTrigger>
          <SelectContent>
            {units.map((proprity, index) => (
              <SelectItem key={index} value={proprity}>
                {proprity}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
