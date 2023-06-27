"use client";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import useAuthProvider from "@/hooks/authProvider";
import { UsePocketBase } from "@/hooks/pocketbase";

interface NewComponentCreatorProps { }

export default function NewComponentCreator({ }: NewComponentCreatorProps) {
  const router = useRouter();

  const { user } = useAuthProvider();

  const { pb } = UsePocketBase();

  const handleCreateNewComponent = async () => {
    const creationData = {
      name: "New Component",
    };
    const res = await pb.create(
      "components",
      creationData,
      "Component Has Been Created"
    );

    if (!res) return;

    router.refresh();
  };

  if (!user) return null;

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
