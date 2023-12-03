"use client";

import AllRequestTable from "@/components/all-request-table";
import ChangeControlRequestForm from "@/components/change-request-form";
import RegistrationForm from "@/components/create-user-form";
import UsersTable from "@/components/users-table";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: { user_id: string } }) => {
  const supabase = createClient();

  const getUserInfo = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("user_name, user_last_name, user_role")
      .eq("user_id", params.user_id);

    if (error) {
      console.log(error.message, params.user_id);
      return redirect("/login?message=Could not authenticate user");
    }
    return data[0];
  };

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    getUserInfo().then((data) => setData(data));
  }, []);

  return (
    <div className="flex flex-col justify-center p-8 w-screen max-w-6xl bg-white text-purple-800">
      <h1 className="text-3xl text-center font-semibold p-4">
        Dashboard de {data.user_name} {data.user_last_name}
      </h1>
      {data.user_role === "MANAGER" ? (
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
