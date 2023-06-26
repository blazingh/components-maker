"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import supabase from "@/lib/supabase";
import { useToast } from "./ui/use-toast";
import { DtoComponentItem } from "@/types/types";
import { useState } from "react";

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
  const { toast } = useToast();

  const [componentVersions, setComponentVersions] = useState<{
    live_version: number;
    demo_version: number;
  }>({
    live_version: live_version || 0,
    demo_version: demo_version || 0,
  });

  return (
    <div className="flex flex-col justify-between w-full gap-y-2 ">
      <div className="flex flex-row items-center gap-x-2">
        <Label className="w-36">Demo Version </Label>
        <Select
          value={String(componentVersions.demo_version)}
          onValueChange={async (versionId: string) => {
            setComponentVersions({
              ...componentVersions,
              demo_version: Number(versionId),
            });
            const res = await supabase
              .from("component")
              .update({
                demo_version: Number(versionId),
              })
              .eq("id", component.id)
              .select();

            if (res.error) {
              setComponentVersions({
                ...componentVersions,
                demo_version: demo_version || 0,
              });
              toast({
                variant: "destructive",
                description: `Failed to update "Demo Version" for ${component.name}`,
              });
            } else {
              toast({
                description: `"Demo Version" updated for ${component.name}`,
              });
            }
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
            setComponentVersions({
              ...componentVersions,
              live_version: Number(versionId),
            });
            const res = await supabase
              .from("component")
              .update({
                live_version: Number(versionId),
              })
              .eq("id", component.id)
              .select();

            if (res.error) {
              setComponentVersions({
                ...componentVersions,
                live_version: live_version || 0,
              });
              toast({
                variant: "destructive",
                description: `Failed to update "Live Version" for "${component.name}"`,
              });
            } else
              toast({
                description: `"Live Version" updated for "${component.name}"`,
              });
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
