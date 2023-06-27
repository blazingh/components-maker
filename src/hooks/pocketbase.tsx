import { useToast } from "@/components/ui/use-toast";
import pb from "@/lib/pocketbase";

interface UsePocketBaseReturn {
  pb: {
    create: <ItemType>(
      collection: string,
      data: any,
      successMessage: string
    ) => Promise<ItemType | null>;
    update: <ItemType>(
      collection: string,
      itemId: string,
      data: any,
      successMessage: string
    ) => Promise<ItemType | null>;
    delete: <ItemType>(
      collection: string,
      itemId: string,
      successMessage: string
    ) => Promise<ItemType | null>;
  };
}

export const UsePocketBase = (): UsePocketBaseReturn => {
  const { toast } = useToast();

  async function createItem<ItemType>(
    collection: string,
    data: any,
    successMessage: string
  ) {
    try {
      const res = await pb.collection(collection).create(data);
      if (res)
        toast({
          title: "Created successfully",
          description: successMessage,
        });
      return res.export() as ItemType;
    } catch (error: any) {
      toast({
        title: "Error creating",
        description: error.message,
      });
      return null;
    }
  }

  async function updateItem<ItemType>(
    collection: string,
    itemId: string,
    data: any,
    successMessage: string
  ) {
    try {
      const res = await pb.collection(collection).update(itemId, data);
      if (res)
        toast({
          title: "Updated successfully",
          description: successMessage,
        });
      return res as ItemType;
    } catch (error: any) {
      toast({
        title: "Error updating",
        description: error.message,
      });
      return null;
    }
  }

  async function deleteItem<ItemType>(
    collection: string,
    itemId: string,
    successMessage: string
  ) {
    try {
      const res = await pb.collection(collection).delete(itemId);
      if (res)
        toast({
          title: "Deleted successfully",
          description: successMessage,
        });
      return res as ItemType;
    } catch (error: any) {
      toast({
        title: "Error deleting",
        description: error.message,
      });
      return null;
    }
  }

  return {
    pb: {
      create: createItem,
      update: updateItem,
      delete: deleteItem,
    },
  };
};

export const safePocketBase = {
  getFirstListItem: async <ItemType,>(
    collection: string,
    key: string,
    value: any
  ) => {
    try {
      const res = await pb.collection(collection).getFirstListItem(key, value);
      return res.export() as ItemType;
    } catch (error: any) {
      return null;
    }
  },
  getFullList: async <ItemType,>(
    collection: string,
    queryParams?: { [key: string]: string | string[] | undefined }
  ) => {
    try {
      const res = await pb.collection(collection).getFullList(queryParams);
      return res as ItemType[];
    } catch (error: any) {
      return null;
    }
  },
};
