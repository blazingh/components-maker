import { useToast } from "@/components/ui/use-toast";
import pb from "@/lib/pocketbase";

interface UsePocketBaseReturn {
  pb: {
    create: (collection: string, data: any, successMessage: string) => void;
    update: (
      collection: string,
      itemId: string,
      data: any,
      successMessage: string
    ) => void;
    delete: (
      collection: string,
      itemId: string,
      successMessage: string
    ) => void;
  };
}
export const UsePocketBase = (): UsePocketBaseReturn => {
  const { toast } = useToast();

  const createItem = async (
    collection: string,
    data: any,
    successMessage: string
  ) => {
    try {
      const res = await pb.collection(collection).create(data);
      if (res)
        toast({
          title: "Created successfully",
          description: successMessage,
        });
    } catch (error: any) {
      toast({
        title: "Error creating",
        description: error.message,
      });
    }
  };

  const updateItem = async (
    collection: string,
    itemId: string,
    data: any,
    successMessage: string
  ) => {
    try {
      const res = await pb.collection(collection).update(itemId, data);
      if (res)
        toast({
          title: "Updated successfully",
          description: successMessage,
        });
    } catch (error: any) {
      toast({
        title: "Error updating",
        description: error.message,
      });
    }
  };

  const deleteItem = async (
    collection: string,
    itemId: string,
    successMessage: string
  ) => {
    try {
      const res = await pb.collection(collection).delete(itemId);
      if (res)
        toast({
          title: "Deleted successfully",
          description: successMessage,
        });
    } catch (error: any) {
      toast({
        title: "Error deleting",
        description: error.message,
      });
    }
  };

  return {
    pb: {
      create: createItem,
      update: updateItem,
      delete: deleteItem,
    },
  };
};
