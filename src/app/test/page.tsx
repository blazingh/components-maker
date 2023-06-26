"use client";

import useAuthProvider from "@/hooks/authProvider";

export default function Page() {
  const { user, signIn, signOut } = useAuthProvider();

  return (
    <div>
      <h1>Test Page</h1>
      <button onClick={signIn}>Sign In</button>
      <br />
      <button onClick={signOut}>Sign Out</button>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
