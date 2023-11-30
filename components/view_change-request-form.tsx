"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { RequestData } from "@/database.types";

interface RequestFormProps {
  request_id: number;
  isDeveloper?: boolean;
  manager_id?: string;
  isModifiable?: boolean;
}

const ViewChangeControlRequestForm = ({
  request_id,
  isDeveloper,
  manager_id,
  isModifiable,
}: RequestFormProps) => {
  const supabase = createClient();

  const getRequestData = async () => {
    const { data, error } = await supabase
      .from("change_request")
      .select(
        `change_description, change_reason, created_at, id, impact_change, project_name, proposed_action, request_name, requested_by(user_name, user_last_name)`
      )
      .eq("id", request_id)
      .limit(1);
    if (error) {
      throw error;
    }
    return data[0];
  };

  const getReviewRequestData = async () => {
    const { data, error } = await supabase
      .from("manage_change_request")
      .select(
        `id, change_request_id, aproval_date, created_at, manager_id(id, user_name, user_last_name), status`
      )
      .eq("change_request_id", request_id)
      .limit(1);
    if (error) {
      console.log(error);
      return;
    }
    return data[0];
  };

  const [requestsData, setRequestsData] = useState<RequestData | any>(null);
  const [reviewRequestData, setReviewRequestData] = useState<any>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requestsData = await getRequestData();
        const reviewRequestData = await getReviewRequestData();
        setRequestsData(requestsData);
        setReviewRequestData(reviewRequestData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequests();
  }, []);

  const getActualDate = new Date();
  const formattedDate = getActualDate.toISOString().slice(0, 10);
  const [formData, setFormData] = useState({
    projectName: requestsData.project_name,
    requestedBy:
      requestsData.requested_by.user_name +
      " " +
      requestsData.requested_by.user_last_name,
    requestNo: requestsData.id,
    date: requestsData.created_at,
    nameOfRequest: requestsData.request_name,
    changeDescription: requestsData.change_description,
    changeReason: requestsData.change_reason,
    impactOfChange: requestsData.impact_change,
    proposedAction: requestsData.proposed_action,
    status: reviewRequestData?.status || "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const dataToInsert = {
      change_request_id: request_id,
      manager_id: requestsData.requested_by.id,
      aproval_date: formattedDate,
      status: "IN REVIEW" as "IN_REVIEW" | "APROVED" | "REJECTED" | null,
    };

    const { error } = await supabase
      .from("manage_change_request")
      .insert([dataToInsert]);

    if (error) {
      console.log(error);
      return;
    } else {
      console.log("Success");
    }
  };

  return (
    <div className="flex justify-center p-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-blue-900 text-white p-6 rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-6">Change Control Request Form</h2>

        <div className="grid grid-cols-1 gap-6">
          {/* Project Name */}
          <div>
            <label htmlFor="projectName" className="block mb-2">
              Project Name
            </label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="w-full rounded-md bg-blue-800 border border-blue-700 p-2 disabled:"
              required
            />
          </div>

          <div className="grid grid-cols-3">
            <div className="mr-2 grid-cols-1">
              {/* Requested By */}
              <div>
                <label htmlFor="requestedBy" className="block mb-2">
                  Requested By
                </label>
                <input
                  type="text"
                  name="requestedBy"
                  value={formData.requestedBy}
                  disabled
                  onChange={handleChange}
                  className="w-full rounded-md bg-blue-800 border border-blue-700 p-2"
                />
              </div>

              {/* Request No */}
              <div className="mt-4">
                <label htmlFor="requestNo" className="block mb-2">
                  Request No
                </label>
                <input
                  type="text"
                  name="requestNo"
                  value={formData.requestNo}
                  disabled
                  onChange={handleChange}
                  className="w-full rounded-md bg-blue-800 border border-blue-700 p-2"
                />
              </div>
            </div>
            <div className="col-span-2 ml-4">
              {/* Date */}
              <div>
                <label htmlFor="requestedBy" className="block mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  disabled
                  onChange={handleChange}
                  className="w-full rounded-md bg-blue-800 border border-blue-700 p-2"
                />
              </div>

              {/* Request Name */}
              <div className="mt-4">
                <label htmlFor="requestNo" className="block mb-2">
                  Request Name
                </label>
                <input
                  type="text"
                  name="nameOfRequest"
                  value={formData.nameOfRequest}
                  onChange={handleChange}
                  className="w-full rounded-md bg-blue-800 border border-blue-700 p-2"
                />
              </div>
            </div>
          </div>

          {/* Change Description */}
          <div>
            <label htmlFor="changeDescription" className="block mb-2">
              Change Description
            </label>
            <textarea
              name="changeDescription"
              value={formData.changeDescription}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md bg-blue-800 border border-blue-700 p-2"
            />
          </div>

          {/* Change Reason */}
          <div>
            <label htmlFor="changeReason" className="block mb-2">
              Change Reason
            </label>
            <textarea
              name="changeReason"
              value={formData.changeReason}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md bg-blue-800 border border-blue-700 p-2"
            />
          </div>

          {/* Impact of Change */}
          <div>
            <label htmlFor="impactOfChange" className="block mb-2">
              Impact of Change
            </label>
            <textarea
              name="impactOfChange"
              value={formData.impactOfChange}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md bg-blue-800 border border-blue-700 p-2"
            />
          </div>

          {/* Proposed Action */}
          <div>
            <label htmlFor="proposedAction" className="block mb-2">
              Proposed Action
            </label>
            <textarea
              name="proposedAction"
              value={formData.proposedAction}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md bg-blue-800 border border-blue-700 p-2"
            />
          </div>

          {/* Status */}
          <div className={isDeveloper && isModifiable ? "hidden " : "block"}>
            <label htmlFor="status" className="block mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-md bg-blue-800 border border-blue-700 p-2 disabled:"
              required={!isDeveloper}
            >
              <option value="In Review">In Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Approval Date */}
          <div className={isDeveloper && isModifiable ? "hidden " : "block"}>
            <label htmlFor="approvalDate" className="block mb-2">
              Approval Date
            </label>
            <input
              type="date"
              name="approvalDate"
              value={formattedDate}
              onChange={handleChange}
              className="w-full rounded-md bg-blue-800 border border-blue-700 p-2"
              required={!isDeveloper}
            />
          </div>

          {/* Approved By */}
          <div className={isDeveloper && isModifiable ? "hidden" : "block"}>
            <label htmlFor="approvedBy" className="block mb-2">
              Approved By
            </label>
            <input
              type="text"
              name="approvedBy"
              value={manager_id}
              onChange={handleChange}
              className="w-full rounded-md bg-blue-800 border border-blue-700 p-2"
              required={!isDeveloper}
            />
          </div>

          <div className="flex justify-end mt-6 ">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-600 rounded-md px-4 py-2 font-bold"
            >
              Submit Request
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ViewChangeControlRequestForm;
