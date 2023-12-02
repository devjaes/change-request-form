"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { Database } from "@/database.types";
import Link from "next/link";

interface Request {
  change_description: string;
  change_reason: string;
  created_at: string;
  id: number;
  impact_change: string;
  project_name: string;
  proposed_action: string;
  request_name: string;
  requested_by: string | null;
  reviewRequestData?: {
    id: number;
    change_request_id: number;
    aproval_date: string | null;
    created_at: string;
    manager: { id: string; user_name: string; user_last_name: string };
    status: Database["public"]["Enums"]["request_status"] | null;
  };
}

const AllRequestTable = ({
  userId,
  isManager,
}: {
  userId: string;
  isManager?: boolean;
}) => {
  const supabase = createClient();
  const [requests, setRequests] = useState<any[]>([]);

  const getRequestData = async () => {
    const { data, error } = await supabase
      .from("change_request")
      .select(
        `change_description, change_reason, created_at, id, impact_change, project_name, proposed_action, request_name, requested_by(user_name, user_last_name)`
      );
    if (error) {
      throw error;
    }
    return data;
  };

  const getReviewRequestData = async () => {
    const { data, error } = await supabase
      .from("manage_change_request")
      .select(
        `id, change_request_id, aproval_date, created_at, manager_id(id, user_name, user_last_name), status`
      );
    if (error) {
      throw error;
    }
    return data;
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requestsData = await getRequestData();
        const reviewRequestData = await getReviewRequestData();
        setRequests(
          requestsData.map((request) => ({
            ...request,
            reviewRequestData: reviewRequestData.find(
              (review) => review.change_request_id === request.id
            ),
          }))
        );
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-left font-bold p-4 mb-6 text-persian-blue-700">
        All Requests
      </h1>

      <div className="flex justify-center w-full">
        <table className="w-11/12  rounded-md overflow-hidden shadow-xl shadow-gray-500 ">
          <thead className="bg-chetwode-blue-700 h-14">
            <tr className="border h-14 text-white">
              <th className="border border-chetwode-blue-700 w-40 ">
                Request Name
              </th>
              <th className="border border-chetwode-blue-700 w-52">
                Change Description
              </th>
              <th className="border border-chetwode-blue-700 w-48">
                Change Reason
              </th>
              <th className="border border-chetwode-blue-700 w-48">
                Impact of Change
              </th>
              {isManager ? (
                <th className="border border-chetwode-blue-700 w-40">
                  Requested By
                </th>
              ) : (
                <th className="border border-chetwode-blue-700 w-40">
                  Approved By
                </th>
              )}
              <th className="border border-chetwode-blue-700 w-40">Status</th>
              <th className="border border-chetwode-blue-700 w-40">Options</th>
            </tr>
          </thead>
          <tbody className="text-black text-center border h-14 ">
            {requests.map((request, index) => (
              <tr
                key={request.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                } h-12`}
              >
                <td className="border">{request.request_name}</td>
                <td className="border ">{request.change_description}</td>
                <td className="border ">{request.change_reason}</td>
                <td className="border ">{request.impact_change}</td>
                {isManager ? (
                  <td className="border ">
                    {request.requested_by.user_name +
                      " " +
                      request.requested_by.user_last_name}
                  </td>
                ) : (
                  <td className="border ">
                    {request.reviewRequestData
                      ? request.reviewRequestData?.manager_id.user_name +
                        " " +
                        request.reviewRequestData?.manager_id.user_last_name
                      : "Pending"}
                  </td>
                )}
                <td className="border ">
                  {request.reviewRequestData
                    ? request.reviewRequestData.status
                    : "Pending"}
                </td>
                <td className="border ">
                  <Link
                    className=" px-4 rounded-md no-underline  text-black hover:text-chetwode-blue-400"
                    href={"/view-request/[request_id]"}
                    as={`${userId}/view-request/${request.id}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequestTable;
