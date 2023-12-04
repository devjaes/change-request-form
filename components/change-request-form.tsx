"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
interface RequestFormProps {
  last_request_id?: number;
  user_id: string;
  user_name: string;
  user_last_name: string;
}

const ChangeControlRequestForm = ({
  last_request_id,
  user_id,
  user_name,
  user_last_name,
}: RequestFormProps) => {
  const router = useRouter();
  const supabase = createClient();
  const getActualDate = new Date();
  const formattedDate = getActualDate.toISOString().slice(0, 10);
  const [formData, setFormData] = useState({
    projectName: "",
    requestedBy: user_name + " " + user_last_name,
    requestNo: last_request_id ? last_request_id + 1 : "",
    date: formattedDate,
    nameOfRequest: "",
    changeDescription: "",
    changeReason: "",
    impactOfChange: "",
    proposedAction: "",
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      requestedBy: user_name + " " + user_last_name,
    }));
  }, [user_name, user_last_name]);

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
      created_at: formData.date,
      project_name: formData.projectName,
      requested_by: user_id,
      request_name: formData.nameOfRequest,
      change_description: formData.changeDescription,
      change_reason: formData.changeReason,
      impact_change: formData.impactOfChange,
      proposed_action: formData.proposedAction,
    };

    const { error } = await supabase
      .from("change_request")
      .insert([dataToInsert]);

    if (error) {
      console.log(error);
      return;
    } else {
      console.log("Success");
      router.push("/dashboard/" + user_id);
    }
  };

  return (
    <div className="flex justify-center p-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-chetwode-blue-600 text-chetwode-blue-100 p-6 rounded-lg"
      >
        <div className="flex justify-center ">
          <h2 className="text-2xl font-bold mb-6">
            Change Control Request Form
          </h2>
        </div>

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
              className="text-chetwode-blue-950 w-full rounded-md bg-chetwode-blue-100 border border-chetwode-blue-700 p-2 disabled:"
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
                  className=" text-chetwode-blue-950 w-full rounded-md bg-chetwode-blue-100 border border-chetwode-blue-700 p-2"
                  required
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
                  className=" text-chetwode-blue-950 w-full rounded-md bg-chetwode-blue-100 border border-chetwode-blue-700 p-2"
                  required
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
                  className="text-chetwode-blue-950 w-full rounded-md bg-chetwode-blue-100 border border-chetwode-blue-700 p-2"
                  required
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
                  className="text-chetwode-blue-950 w-full rounded-md bg-chetwode-blue-100 border border-chetwode-blue-700 p-2"
                  required
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
              className="text-chetwode-blue-950 w-full rounded-md bg-chetwode-blue-100 border border-chetwode-blue-700 p-2"
              required
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
              className="text-chetwode-blue-950 w-full rounded-md bg-chetwode-blue-100 border border-chetwode-blue-700 p-2"
              required
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
              className="text-chetwode-blue-950 w-full rounded-md bg-chetwode-blue-100 border border-chetwode-blue-700 p-2"
              required
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
              className="text-chetwode-blue-950 w-full rounded-md bg-chetwode-blue-100 border border-chetwode-blue-700 p-2"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <Link
              className="bg-red-700 hover:bg-red-600 rounded-md px-4 py-2 font-bold"
              href={"/dashboard/[user_id]"}
              as={`/dashboard/${user_id}`}
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-chetwode-blue-800 hover:bg-chetwode-blue-900 rounded-md px-4 py-2 font-bold "
            >
              Submit Request
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangeControlRequestForm;
