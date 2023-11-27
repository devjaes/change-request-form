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
  console.log(params.user_id);

  const { data, error } = await supabase
    .from("users")
    .select("user_name")
    .eq("user_id", params.user_id);

  if (error) {
    console.log(error.message, params.user_id);
    return redirect("/login?message=Could not authenticate user");
  }
  user_name = data[0].user_name;

  return (
    <div>
      <h1>Dashboard de {user_name}</h1>
      <UsersTable />
      <ChangeControlRequestForm />
      <RegistrationForm />
    </div>
  );
};

export default Page;
