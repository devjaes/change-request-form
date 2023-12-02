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
        <button className="py-2 px-4 rounded-md no-underline bg-persian-blue-800 text-white font-bold hover:bg-chetwode-blue-400">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-persian-blue-800 text-white hover:bg-chetwode-blue-400"
    >
      Login
    </Link>
  );
}
