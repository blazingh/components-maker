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

interface ComponentCardSettingsProps {
  component: DtoComponentItem;
  versions?: DtoVersionItem[];
}

export default function ComponentCardSettings({ }: ComponentCardSettingsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreVerticalIcon className="w-6 h-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Eye className="w-6 h-6" />
          <Label className="ml-2">View</Label>
        </DropdownMenuItem>
        <DropdownMenuItem>
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
