import ChangeControlRequestForm from "@/components/change-request-form";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: { user_id: string } }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("users")
    .select("user_name, user_last_name, user_role")
    .eq("user_id", params.user_id);

  const get_last_request_id = async () => {
    const { data, error } = await supabase
      .from("change_request")
      .select("id")
      .order("id", { ascending: false })
      .limit(1);

    if (error) {
      console.log(error);
      return redirect("/?message=Could not get last request id");
    }

    return data[0].id;
  };

  const last_request_id = await get_last_request_id();

  if (error) {
    console.log(error.message, params.user_id);
    return redirect("/login?message=Could not authenticate user");
  }
  const user_name = data[0].user_name;
  const user_lastName = data[0].user_last_name;
  const user_role = data[0].user_role;
  return (
    <div>
      <ChangeControlRequestForm
        user_id={params.user_id}
        user_name={user_name}
        user_last_name={user_lastName}
        last_request_id={last_request_id}
      />
    </div>
  );
};

export default Page;
