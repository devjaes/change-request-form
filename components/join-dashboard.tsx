import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

const JoinDashboard = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="w-full h-full ">
      <div className="bg-slate-500 h-56 w-auto flex items-center justify-center"></div>
      {user?.id ? (
        <Link href={`/dashboard/${user.id}`}>Join Dashboard</Link>
      ) : (
        "Login to join dashboard"
      )}
    </div>
  );
};

export default JoinDashboard;
