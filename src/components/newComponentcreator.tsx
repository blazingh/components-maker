"use client";
import supabase from "@/lib/supabase";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

interface NewComponentCreatorProps { }

export default function NewComponentCreator({ }: NewComponentCreatorProps) {
  
    const { toast } = useToast();

    const router = useRouter();

    const handleCreateNewComponent = async () => {
      const res = await supabase
        .from("component")
        .insert({
          name: "New Component",
        })
        .select();

      if (res.error) {
        toast({
          variant: "destructive",
          title: "Error creating component",
          description: res.error.message,
        });
      } else {
        toast({
          description: `A component was created`,
        });
        router.refresh();
      }
    };

    return (
      <div className="flex w-full justify-center items-center">
        <Button
          className=" flex flex-col justify-center items-center"
          onClick={handleCreateNewComponent}
        >
          <Label className="">Create New Component</Label>
        </Button>
      </div>
    );
  }
