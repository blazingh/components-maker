"use client";

import { DtoEnabled } from "@/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";

interface EnabledVersionsChangerProps {
  enabled: DtoEnabled | undefined;
  porperties: { label: any; value: string }[];
}

export default function EnabledVersionsChanger({
  enabled,
  porperties,
}: EnabledVersionsChangerProps) {
  return (
    <div className="flex flex-row justify-between w-full">
      <div className="flex flex-row items-center gap-x-2">
        <Label className="w-24">Demo Version </Label>
        <Select value={enabled?.demo} onValueChange={(versionId: string) => { }}>
          <SelectTrigger className="w-20 h-8">
            <SelectValue placeholder="0" />
          </SelectTrigger>
          <SelectContent>
            {porperties.map((proprity, index) => (
              <SelectItem key={index} value={proprity.value}>
                {proprity.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row items-center gap-x-2">
        <Label>Live Version </Label>
        <Select value={enabled?.live} onValueChange={(versionId: string) => { }}>
          <SelectTrigger className="w-20 h-8">
            <SelectValue placeholder="0" />
          </SelectTrigger>
          <SelectContent>
            {porperties.map((proprity, index) => (
              <SelectItem key={index} value={proprity.value}>
                {proprity.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
