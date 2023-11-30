import ViewChangeControlRequestForm from "@/components/view_change-request-form";
import React from "react";

const Page = ({ params }: { params: { request_id: string } }) => {
  return (
    <div>
      <ViewChangeControlRequestForm request_id={Number(params.request_id)} />
    </div>
  );
};

export default Page;
