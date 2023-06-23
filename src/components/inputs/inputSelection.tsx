import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

interface InputSelectionProps {
  label: string;
  value: string;
  onValueChange: (value: any) => void;
  proprities: { label: string; value: string }[];
}

export function InputSelection({
  label,
  value,
  onValueChange,
  proprities,
}: InputSelectionProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
      <Label htmlFor="justify-content" className="text-sm capitalize ">
        {label}
      </Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Justify Content" />
        </SelectTrigger>
        <SelectContent>
          {proprities.map((proprity, index) => (
            <SelectItem key={index} value={proprity.value}>
              {proprity.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
