import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface InputWithLabelProps {
  label: string;
  value: string | number;
  placeholder: string;
  type: string;
  onChange: (value: any) => void;
  onBlur?: (value: any) => void;
}

export function InputWithLabel({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  type,
}: InputWithLabelProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
      <Label htmlFor="border-radius" className="text-sm capitalize ">
        {label}
      </Label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur || onChange}
      />
    </div>
  );
}
