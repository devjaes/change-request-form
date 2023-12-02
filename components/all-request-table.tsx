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
      <h1 className="text-2xl text-left font-semibold p-4">All Requests</h1>

      <div className="flex justify-center w-full">
        <table className="w-11/12">
          <thead>
            <tr>
              <th>Request Name</th>
              <th>Change Description</th>
              <th>Change Reason</th>
              <th>Impact of Change</th>
              {isManager ? <th>Requested By</th> : <th>Approved By</th>}
              <th>Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.request_name}</td>
                <td>{request.change_description}</td>
                <td>{request.change_reason}</td>
                <td>{request.impact_change}</td>
                {isManager ? (
                  <td>
                    {request.requested_by.user_name +
                      " " +
                      request.requested_by.user_last_name}
                  </td>
                ) : (
                  <td>
                    {request.reviewRequestData
                      ? request.reviewRequestData?.manager_id.user_name +
                        " " +
                        request.reviewRequestData?.manager_id.user_last_name
                      : "Pending"}
                  </td>
                )}
                <td>
                  {request.reviewRequestData
                    ? request.reviewRequestData.status
                    : "Pending"}
                </td>
                <td>
                  <Link
                    className="py-2 px-4 rounded-md no-underline bg-slate-100 text-black dark:text-white dark:bg-btn-background hover:bg-btn-background-hover"
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
