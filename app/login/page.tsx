import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <>
      <Link
        href="/"
        className="absolute left-8 top-4 py-2 px-4 rounded-md no-underline text-foreground bg-purple-700 hover:bg-chetwode-blue-500 flex items-center group text-sm text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className=" h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>
      <div className=" flex drop-shadow-md max-w-4xl  justify-center gap-2 bg-gradient-to-r from-purple-400 to-purple-900 rounded-lg">
        <div className="animate-in">
          <div className="absolute inset-0 bg-chetwode-blue-950 bg-opacity-40"></div>
          <img
            src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2113&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="object-cover h-full w-full rounded-l-lg"
          />

          <div className="flex flex-col items-center justify-center text-foreground text-center text-4xl p-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-light">
            <p>Change Request </p>
          </div>
        </div>
        <form
          className="animate-in flex flex-col w-full justify-center gap-2 text-foreground p-8 px-20 text-white  "
          action={signIn}
        >
          <h1 className="text-3xl font-bold text-center text-white mb-6">
            Iniciar Sesión
          </h1>
          <label className="text-md text-white " htmlFor=" email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6 bg-white text-black"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6 bg-white text-black"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <button className="bg-gradient-to-l from-purple-500 to-purple-950 rounded-md px-4 py-2 text-foreground mb-2 text-white font-bold hover:bg-chetwode-blue-800">
            Sign In
          </button>
          {/* <button
            formAction={signUp}
            className="border border-white text-white font-bold rounded-md px-4 py-2 text-foreground mb-2 hover:bg-chetwode-blue-600 "
          >
            Sign Up
          </button> */}
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
