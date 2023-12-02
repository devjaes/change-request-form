import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import React from "react";
import RegistrationForm from "./create-user-form";

const UsersTable = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from("users").select();

  return (
    <div className="flex flex-col justify-center p-8">
      <div className="flex justify-between">
        <h2 className="block text-persian-blue-800 text-2xl font-bold mb-6">
          Users Table
        </h2>
        <RegistrationForm />
      </div>

      <div className="flex justify-center w-full">
        <table className="w-11/12  rounded-md overflow-hidden shadow-xl shadow-gray-500">
          <thead className="bg-chetwode-blue-700 h-12">
            <tr className="border h-12 text-white">
              <th className="border border-chetwode-blue-700 w-40 ">Name</th>
              <th className="border border-chetwode-blue-700 w-40 ">
                Lastname
              </th>
              <th className="border border-chetwode-blue-700 w-40 ">Email</th>
              <th className="border border-chetwode-blue-700 w-40 ">Role</th>
            </tr>
          </thead>
          <tbody className="text-black text-center border h-11">
            {data?.map((user, index) => (
              <tr
                key={user.user_id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                } h-12`}
              >
                <td className="px-6 py-4">{user.user_name}</td>
                <td className="px-6 py-4">{user.user_last_name}</td>
                <td className="px-6 py-4">{user.user_email}</td>
                <td className="px-6 py-4">{user.user_role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
