"use client";
import { useState } from "react";

const ChangeControlRequestForm = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    requestedBy: "",
    requestNo: "",
    changeDescription: "",
    changeReason: "",
    impactOfChange: "",
    proposedAction: "",
    status: "In Review",
    approvalDate: "",
    approvedBy: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="flex justify-center p-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-blue-900 text-white p-6 rounded-lg"
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
              className="w-full rounded-md bg-blue-800 border border-blue-700 p-2"
              required
            />
          </div>

          {/* Requested By */}
          <div>
            <label htmlFor="requestedBy" className="block mb-2">
              Requested By
            </label>
            <input
              type="text"
              name="requestedBy"
              value={formData.requestedBy}
              onChange={handleChange}
              className="w-full rounded-md bg-blue-800 border border-blue-700 p-2"
              required
            />
          </div>

          {/* Request No */}
          <div>
            <label htmlFor="requestNo" className="block mb-2">
              Request No
            </label>
            <input
              type="text"
              name="requestNo"
              value={formData.requestNo}
              onChange={handleChange}
              className="w-full rounded-md bg-blue-800 border border-blue-700 p-2"
              required
            />
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
              className="w-full rounded-md bg-blue-800 border border-blue-700 p-2"
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
              className="w-full rounded-md bg-blue-800 border border-blue-700 p-2"
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
              className="w-full rounded-md bg-blue-800 border border-blue-700 p-2"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-md bg-blue-800 border border-blue-700 p-2"
            >
              <option value="In Review">In Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Approval Date */}
          <div>
            <label htmlFor="approvalDate" className="block mb-2">
              Approval Date
            </label>
            <input
              type="date"
              name="approvalDate"
              value={formData.approvalDate}
              onChange={handleChange}
              className="w-full rounded-md bg-blue-800 border border-blue-700 p-2"
              required
            />
          </div>

          {/* Approved By */}
          <div>
            <label htmlFor="approvedBy" className="block mb-2">
              Approved By
            </label>
            <input
              type="text"
              name="approvedBy"
              value={formData.approvedBy}
              onChange={handleChange}
              className="w-full rounded-md bg-blue-800 border border-blue-700 p-2"
              required
            />
          </div>

          <div className="flex justify-end mt-6">
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

export default ChangeControlRequestForm;
