import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let user_name = "";

  if (user) {
    const { data, error } = await supabase
      .from("users")
      .select("user_name")
      .eq("user_id", user?.id);

    if (error) {
      console.log(error);
      return redirect("/login?message=Could not authenticate user");
    }
    user_name = data[0].user_name;
  }

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4 text-md font-semibold">
      Hey, {user_name}!
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-slate-100 text-black dark:text-white dark:bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-slate-100 text-black dark:text-white darK:bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
