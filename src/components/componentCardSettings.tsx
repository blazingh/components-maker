"use client";
import { DtoComponentItem, DtoVersionItem } from "@/types/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Eye, MoreVerticalIcon, Trash } from "lucide-react";
import { Label } from "./ui/label";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

interface ComponentCardSettingsProps {
  component: DtoComponentItem;
  versions?: DtoVersionItem[];
}

export default function ComponentCardSettings({
  component,
  versions,
}: ComponentCardSettingsProps) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreVerticalIcon className="w-6 h-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => router.push(`/edit/${component.id}`)}>
          <Eye className="w-6 h-6" />
          <Label className="ml-2">View</Label>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => router.push(`/edit/${component.id}`)}>
          <Edit className="w-6 h-6" />
          <Label className="ml-2">Edit</Label>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive">
          <Trash className="w-6 h-6" />
          <Label className="ml-2">Delete</Label>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
