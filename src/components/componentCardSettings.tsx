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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import supabase from "@/lib/supabase";
import { Button } from "./ui/button";

interface ComponentCardSettingsProps {
  component: DtoComponentItem;
  versions?: DtoVersionItem[];
}

export default function ComponentCardSettings({
  component,
  versions,
}: ComponentCardSettingsProps) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    console.log("delete");
    const res = await supabase
      .from("component")
      .delete()
      .eq("id", component.id);

    if (res.error) {
      toast({
        variant: "destructive",
        title: "Error deleting component",
        description: res.error.message,
      });
    } else {
      toast({
        title: "Component deleted",
        description: `Component ${component.name} was deleted`,
      });
      router.refresh();
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreVerticalIcon className="w-6 h-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onSelect={() => router.push(`/edit/${component.id}`)}
          >
            <Eye className="w-6 h-6" />
            <Label className="ml-2">View</Label>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => router.push(`/edit/${component.id}`)}
          >
            <Edit className="w-6 h-6" />
            <Label className="ml-2">Edit</Label>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive"
            onSelect={() => setIsDialogOpen(true)}
          >
            <Trash className="w-6 h-6" />
            <Label className="ml-2">Delete</Label>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              component &quot; {component.name} &quot; . and all of its
              versions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={handleDelete} variant="destructive">
                Delete Component
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
