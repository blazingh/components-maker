import { useToast } from "@/components/ui/use-toast";
import pb from "@/lib/pocketbase";
import { useEffect, useState } from "react";

interface AuthProviderReturnProps {
  user: any | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export default function useAuthProvider(): AuthProviderReturnProps {
  const { toast } = useToast();

  const [user, setUser] = useState<any | null>(null);

  const signIn = async () => {
    try {
      await pb.collection("users").authWithOAuth2({ provider: "github" });
      if (pb.authStore.model) {
        setUser(pb.authStore.model);
      }
      toast({
        description: "You are now signed in",
      });
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message || "An unknown error occurred",
      });
    }
  };

  const signOut = async () => {
    try {
      pb.authStore.clear();
      setUser(null);
      toast({
        description: "You are now signed out",
      });
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message || "An unknown error occurred",
      });
    }
  };

  useEffect(() => {
    if (pb.authStore.model) {
      setUser(pb.authStore.model);
    }
  }, []);

  return {
    user,
    signIn,
    signOut,
  };
}
