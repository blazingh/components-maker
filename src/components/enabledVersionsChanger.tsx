"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { DtoComponentItem } from "@/types/types";
import { useState } from "react";
import { UsePocketBase } from "@/hooks/pocketbase";
import { useRouter } from "next/navigation";

interface EnabledVersionsChangerProps {
  component: DtoComponentItem;
  live_version?: number;
  demo_version?: number;
  porperties: { label: any; value: number }[];
}

export default function EnabledVersionsChanger({
  live_version,
  demo_version,
  porperties,
  component,
}: EnabledVersionsChangerProps) {
  const { pb } = UsePocketBase();
  const router = useRouter();

  const [componentVersions, setComponentVersions] = useState<{
    live_version: number;
    demo_version: number;
  }>({
    live_version: live_version || 0,
    demo_version: demo_version || 0,
  });

  const handleUpdate = async (versionName: string, versionId: string) => {
    setComponentVersions({
      ...componentVersions,
      [versionName]: versionId,
    });
    const res = await pb.update<DtoComponentItem>(
      "components",
      component.id,
      {
        [versionName]: versionId,
      },
      "Version Has been updated"
    );

    if (!res)
      setComponentVersions({
        ...componentVersions,
        [versionName]:
          versionName === "live_version" ? live_version : demo_version,
      });
    else router.refresh();
  };

  return (
    <div className="flex flex-col justify-between w-full gap-y-2 ">
      <div className="flex flex-row items-center gap-x-2">
        <Label className="w-36">Demo Version </Label>
        <Select
          value={String(componentVersions.demo_version)}
          onValueChange={async (versionId: string) => {
            handleUpdate("demo_version", versionId);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="" />
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
        <Label className="w-36">Live Version </Label>
        <Select
          value={String(componentVersions.live_version)}
          onValueChange={async (versionId: string) => {
            handleUpdate("live_version", versionId);
          }}
        >
          <SelectTrigger>
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
