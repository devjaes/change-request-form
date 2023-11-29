import AllRequestTable from "@/components/all-request-table";
import ChangeControlRequestForm from "@/components/change-request-form";
import RegistrationForm from "@/components/create-user-form";
import UsersTable from "@/components/users-table";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { user_id: string } }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  let user_name = "";
  let user_lastName = "";
  let id = 0;

  const { data, error } = await supabase
    .from("users")
    .select("user_name, user_last_name")
    .eq("user_id", params.user_id);

  if (error) {
    console.log(error.message, params.user_id);
    return redirect("/login?message=Could not authenticate user");
  }
  user_name = data[0].user_name;
  user_lastName = data[0].user_last_name;

  return (
    <div className="flex flex-col justify-center p-8 w-full max-w-6xl">
      <h1 className="text-3xl text-center font-semibold">
        Dashboard de {user_name}
      </h1>

      <UsersTable />
      <ChangeControlRequestForm
        user_id={params.user_id}
        user_name={user_name}
        user_last_name={user_lastName}
      />
      <AllRequestTable />
    </div>
  );
};

export default Page;
