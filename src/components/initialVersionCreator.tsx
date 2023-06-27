"use client";
import useAuthProvider from "@/hooks/authProvider";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import pb from "@/lib/pocketbase";
import { initialVersionData } from "@/constants/version";
import { useRouter } from "next/navigation";

interface InitialVersionCreatorProps {
  componentId: string;
}

export const InitialVersionCreator = ({
  componentId,
}: InitialVersionCreatorProps) => {
  const { user } = useAuthProvider();

  const router = useRouter();

  if (!user) return null;

  const handleCreateNewVersion = async () => {
    try {
      await pb.collection("versions").create({
        version_name: "Initial Version",
        data: initialVersionData,
        component: componentId,
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full h-ful justify-center items-center space-y-4 p-4">
      <Label className="text-lg">This component has no versions yet</Label>
      <Button
        className="flex flex-col justify-center items-center"
        onClick={handleCreateNewVersion}
      >
        <Label className="">Create New Version</Label>
      </Button>
    </div>
  );
};
