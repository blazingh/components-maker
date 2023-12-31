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
  label?: string;
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

  const number = String(value).replace(/[^0-9]/g, "");
  const unit = String(value).slice(number.length);

  const onChangeNumber = (e: any) => {
    onChange(e?.target?.value + unit);
  };

  const onChangeUnit = (e: string) => {
    if (e === "unset") return onChange(e);
    console.log(number + e);
    onChange(number + e);
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
      {label && (
        <Label htmlFor="border-radius" className="text-sm capitalize">
          {label}
        </Label>
      )}
      <div className="flex gap-x-2 w-full">
        <Input
          type="number"
          placeholder={placeholder}
          className="w-full "
          value={number || 0}
          onChange={onChangeNumber}
        />
        <Select
          value={units.indexOf(unit) > -1 ? unit : "unset"}
          onValueChange={onChangeUnit}
        >
          <SelectTrigger>
            <SelectValue placeholder={units.indexOf(unit) > -1 ? unit : ""} />
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
