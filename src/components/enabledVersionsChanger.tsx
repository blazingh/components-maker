"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";

interface EnabledVersionsChangerProps {
  live_version?: number;
  demo_version?: number;
  porperties: { label: any; value: number }[];
}

export default function EnabledVersionsChanger({
  live_version,
  demo_version,
  porperties,
}: EnabledVersionsChangerProps) {
  return (
    <div className="flex flex-row justify-between w-full">
      <div className="flex flex-row items-center gap-x-2">
        <Label className="w-24">Demo Version </Label>
        <Select
          value={String(demo_version)}
          onValueChange={(versionId: string) => { }}
        >
          <SelectTrigger className="w-20 h-8">
            <SelectValue placeholder="0" />
          </SelectTrigger>
          <SelectContent>
            {porperties.map((proprity, index) => (
              <SelectItem key={index} value={String(proprity.value)}>
                {proprity.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row items-center gap-x-2">
        <Label>Live Version </Label>
        <Select
          value={String(live_version)}
          onValueChange={(versionId: string) => { }}
        >
          <SelectTrigger className="w-20 h-8">
            <SelectValue placeholder="0" />
          </SelectTrigger>
          <SelectContent>
            {porperties.map((proprity, index) => (
              <SelectItem key={index} value={String(proprity.value)}>
                {proprity.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
