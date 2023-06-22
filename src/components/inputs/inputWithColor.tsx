import { HexAlphaColorPicker, HexColorInput } from "react-colorful";
import { Label } from "../ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Pipette } from "lucide-react";

interface InputWithColorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function InputWithColor({
  label,
  value,
  onChange,
}: InputWithColorProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="color" className="text-sm capitalize text-zinc-300">
        {label}
      </Label>
      <div className="flex gap-x-2 w-full">
        <HexColorInput
          className="w-full rounded-md px-2 py-1 border border-gray-200"
          color={value}
          onChange={(color) => onChange(color)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Pipette width={16} height={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <HexAlphaColorPicker
              color={value}
              onChange={(color) => onChange(color)}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
