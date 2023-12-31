"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

interface RequestFormProps {
  request_id: number;
  userId: string;
}

const ViewChangeControlRequestForm = ({
  request_id,
  userId,
}: RequestFormProps) => {
  const supabase = createClient();
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkUserRole = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("user_role")
      .eq("user_id", userId)
      .limit(1);
    if (error) {
      console.log(error.message);
      return;
    }
    if (data[0].user_role === "DEVELOPER") {
      setIsDeveloper(true);
    }
    return data[0];
  };

  const getRequestData = async () => {
    const { data, error } = await supabase
      .from("change_request")
      .select(
        `change_description, change_reason, created_at, id, impact_change, project_name, proposed_action, request_name, requested_by(user_name, user_last_name)`
      )
      .eq("id", request_id)
      .limit(1);
    if (error) {
      console.log(error.message);
      throw error;
    }
    setFormData((prevData) => ({
      ...prevData,
      projectName: data[0].project_name,
      requestedBy:
        (data[0] as any).requested_by?.user_name +
        " " +
        (data[0] as any).requested_by?.user_last_name,
      requestNo: data[0].id,
      date: data[0].created_at.split("T")[0],
      nameOfRequest: data[0].request_name,
      changeDescription: data[0].change_description,
      changeReason: data[0].change_reason,
      impactOfChange: data[0].impact_change,
      proposedAction: data[0].proposed_action,
    }));
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
      console.log(error.message);
      return;
    }
    console.log(data[0]);
    return data[0];
  };

  const getUserName = async () => {
    const { data, error } = await supabase
      .from("users")
      .select(`user_name, user_last_name`)
      .eq("user_id", userId)
      .limit(1);
    if (error) {
      console.log(error.message);
      return;
    }
    setUserName(data[0].user_name + " " + data[0].user_last_name);
    return data[0];
  };

  const [requestsData, setRequestsData] = useState<any>({});
  const [reviewRequestData, setReviewRequestData] = useState<any>({});
  const [userName, setUserName] = useState<any>("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requestsData = await getRequestData();
        const reviewRequestData = await getReviewRequestData();
        setRequestsData(requestsData);
        setReviewRequestData(reviewRequestData);
        await getUserName();
        await checkUserRole();
      } catch (error: any) {
        console.log({ requestsData }, { reviewRequestData });
        console.log(error.message);
      }
    };
    fetchRequests()
      .then(() => console.log("Success"))
      .catch(console.error);
  }, []);

  const getActualDate = new Date();
  const formattedDate = getActualDate.toISOString().slice(0, 10);
  const [formData, setFormData] = useState({
    projectName: requestsData?.project_name || "",
    requestedBy:
      requestsData?.requested_by?.user_name +
      " " +
      requestsData?.requested_by?.user_last_name || "",
    requestNo: requestsData?.id || "",
    date: requestsData?.created_at || "",
    nameOfRequest: requestsData?.request_name || "",
    changeDescription: requestsData?.change_description || "",
    changeReason: requestsData?.change_reason || "",
    impactOfChange: requestsData?.impact_change || "",
    proposedAction: requestsData?.proposed_action || "",
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
    setIsLoading(true);
    e.preventDefault();

    const dataToInsert = {
      change_request_id: request_id,
      manager_id: userId,
      aproval_date: formattedDate,
      status: formData.status,
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

    setIsLoading(false);

    window.location.href = `/dashboard/${userId}`;
  };

  return (
    <div className="flex justify-center p-8">
      <div
        className={
          isLoading
            ? "fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center"
            : "hidden"
        }
      >
        <div className="bg-white rounded-lg w-1/2 py-4 px-8">
          <h1 className="text-3xl font-bold mb-4">Loading...</h1>
          <div className="flex justify-center">
            <div className="loader"></div>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-chetwode-blue-600 text-chetwode-blue-100  shadow-xl shadow-gray-700 p-6 rounded-lg"
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
              disabled
              value={formData.projectName}
              onChange={handleChange}
              className="w-full rounded-md text-chetwode-blue-950 bg-chetwode-blue-100 border border-chetwode-blue-700 p-2 disabled:"
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
                  className="w-full rounded-md text-chetwode-blue-950 bg-chetwode-blue-100 border border-chetwode-blue-700 p-2"
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
                  className="w-full rounded-md text-chetwode-blue-950 bg-chetwode-blue-100 border border-chetwode-blue-700 p-2"
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
                  className="w-full rounded-md text-chetwode-blue-950 bg-chetwode-blue-100 border border-chetwode-blue-700 p-2"
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
                  disabled
                  value={formData.nameOfRequest}
                  onChange={handleChange}
                  className="w-full rounded-md text-chetwode-blue-950 bg-chetwode-blue-100 border border-chetwode-blue-700 p-2"
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
              disabled
              value={formData.changeDescription}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md text-chetwode-blue-950 bg-chetwode-blue-100 border border-chetwode-blue-700 p-2"
            />
          </div>

          {/* Change Reason */}
          <div>
            <label htmlFor="changeReason" className="block mb-2">
              Change Reason
            </label>
            <textarea
              name="changeReason"
              disabled
              value={formData.changeReason}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md text-chetwode-blue-950 bg-chetwode-blue-100 border border-chetwode-blue-700 p-2"
            />
          </div>

          {/* Impact of Change */}
          <div>
            <label htmlFor="impactOfChange" className="block mb-2">
              Impact of Change
            </label>
            <textarea
              name="impactOfChange"
              disabled
              value={formData.impactOfChange}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md text-chetwode-blue-950 bg-chetwode-blue-100 border border-chetwode-blue-700 p-2"
            />
          </div>

          {/* Proposed Action */}
          <div>
            <label htmlFor="proposedAction" className="block mb-2">
              Proposed Action
            </label>
            <textarea
              name="proposedAction"
              disabled
              value={formData.proposedAction}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md text-chetwode-blue-950 bg-chetwode-blue-100 border border-chetwode-blue-700 p-2"
            />
          </div>

          {/* Status */}
          <div className={isDeveloper ? "hidden " : "block"}>
            <label htmlFor="status" className="block mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-md text-chetwode-blue-950 bg-chetwode-blue-100 border border-chetwode-blue-700 p-2 disabled:"
              required={!isDeveloper}
            >
              <option value="IN_REVIEW">In Review</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          {/* Approval Date */}
          <div className={isDeveloper ? "hidden " : "block" + "disabled:"}>
            <label htmlFor="approvalDate" className="block mb-2">
              Approval Date
            </label>
            <input
              type="date"
              name="approvalDate"
              disabled
              value={formattedDate}
              onChange={handleChange}
              className="w-full rounded-md text-chetwode-blue-950 bg-chetwode-blue-100 border border-chetwode-blue-700 p-2"
              required={!isDeveloper}
            />
          </div>

          {/* Approved By */}
          <div className={isDeveloper ? "hidden" : "block"}>
            <label htmlFor="approvedBy" className="block mb-2">
              Approved By
            </label>
            <input
              type="text"
              name="approvedBy"
              disabled
              value={userName}
              onChange={handleChange}
              className="w-full rounded-md text-chetwode-blue-950 bg-chetwode-blue-100 border border-chetwode-blue-700 p-2"
              required={!isDeveloper}
            />
          </div>

          <div className="flex justify-end mt-6 ">
            {isDeveloper ? (
              <Link
                className="bg-blue-700 hover:bg-blue-600 rounded-md px-4 py-2 font-bold"
                href={"/dashboard/[user_id]"}
                as={`/dashboard/${userId}`}
              >
                Back
              </Link>
            ) : (
              <div className="flex justify-between">
                <Link
                  className="bg-red-700 hover:bg-red-600 rounded-md px-4 py-2 m-6 font-bold"
                  href={"/dashboard/[user_id]"}
                  as={`/dashboard/${userId}`}
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="bg-purple-900 hover:bg-purple-700 rounded-md px-4 py-2 m-6 font-bold"
                >
                  Submit Request
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ViewChangeControlRequestForm;
