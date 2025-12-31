import { getSession } from "next-auth/react";
import AuthButtons from "./components/atoms/auth-button/auth-buttons";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <AuthButtons />
      </main>
    </div>
  );
}
