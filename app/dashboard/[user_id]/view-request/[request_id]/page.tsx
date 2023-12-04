import ViewChangeControlRequestForm from "@/components/view_change-request-form";
import React from "react";

const Page = ({
  params,
}: {
  params: { user_id: string; request_id: string };
}) => {
  return (
    <div className="">
      <ViewChangeControlRequestForm
        userId={params.user_id}
        request_id={Number(params.request_id)}
      />
    </div>
  );
};

export default Page;
