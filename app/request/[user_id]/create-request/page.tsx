"use client";

import ChangeControlRequestForm from "@/components/change-request-form";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

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

  const [last_request_id, setLastRequestId] = React.useState<number>(0);
  const [data, setData] = React.useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      getUserInfo().then((data) => setData(data));
      get_last_request_id().then((data) => setLastRequestId(data));
    };
    fetchData();
  }, []);
  console.log(data);

  return (
    <>
      {data ? (
        <div>
          <ChangeControlRequestForm
            user_id={params.user_id}
            user_name={data.user_name}
            user_last_name={data.user_last_name}
            last_request_id={last_request_id}
          />
        </div>
      ) : (
        <div>
          <h1> Loading... </h1>
        </div>
      )}
    </>
  );
};

export default Page;
