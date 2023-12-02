import AllRequestTable from "@/components/all-request-table";
import ChangeControlRequestForm from "@/components/change-request-form";
import RegistrationForm from "@/components/create-user-form";
import UsersTable from "@/components/users-table";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { user_id: string } }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("users")
    .select("user_name, user_last_name, user_role")
    .eq("user_id", params.user_id);

  if (error) {
    console.log(error.message, params.user_id);
    return redirect("/login?message=Could not authenticate user");
  }
  const user_name = data[0].user_name;
  const user_lastName = data[0].user_last_name;
  const user_role = data[0].user_role;

  return (
    <div className="flex flex-col justify-center p-8 w-screen max-w-6xl bg-white text-purple-800">
      <h1 className="text-3xl text-center font-semibold p-4">
        Dashboard de {user_name}
      </h1>
      {user_role === "MANAGER" ? (
        <>
          <UsersTable />
          <AllRequestTable userId={params.user_id} isManager={true} />
        </>
      ) : (
        <>
          <Link
            className="flex justify-center font-medium p-3"
            href="/request/[user_id]/create-request"
            as={`/request/${params.user_id}/create-request`}
          >
            <p className="py-3 px-4 flex rounded-md no-underline text-lg  text-center  bg-gradient-to-r from-chetwode-blue-400 to-chetwode-blue-800 text-white font-bold">
              Crear petición
            </p>
          </Link>
          <AllRequestTable userId={params.user_id} isManager={false} />
        </>
      )}
    </div>
  );
};

export default Page;
