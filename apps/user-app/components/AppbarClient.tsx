"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AppbarClient() {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Ensures that the component is marked as client-side rendered
    setIsClient(true);
  }, []);

  const handleSignIn = () => {
    signIn();
  };

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "http://localhost:3001/Signin" });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (!isClient) {
    return null; // Render nothing on the server-side to avoid mismatches
  }

  return (
    <Appbar
      onSignin={handleSignIn}
      onSignout={handleSignOut}
      user={session?.user}
    />
  );
}
