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
    <div className="w-full h-full">
      <div className="bg-yellow-600 h-56 w-auto">asd</div>
      {user?.id ? (
        <Link href={`/dashboard/${user.id}`}>Join Dashboard</Link>
      ) : (
        "Login to join dashboard"
      )}
    </div>
  );
};

export default JoinDashboard;
