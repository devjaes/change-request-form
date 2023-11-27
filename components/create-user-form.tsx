"use client";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useRef, useState } from "react";

const RegistrationForm = () => {
  const supabase = createClient();
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [formData, setFormData] = useState({
    role: "DEVELOPER",
    user_name: "",
    user_last_name: "",
    user_email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClickOutside = (event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const singUp = await supabase.auth.signUp({
      email: formData.user_email,
      password: formData.password,
    });

    if (!singUp.data.user?.id) {
      console.log("Error al crear usuario");
      return;
    }

    const dataToInsert = {
      user_id: singUp.data.user.id,
      user_name: formData.user_name,
      user_last_name: formData.user_last_name,
      user_email: formData.user_email,
      user_role: formData.role as "DEVELOPER" | "MANAGER",
    };
    const { error } = await supabase.from("users").insert([dataToInsert]);

    if (error) {
      console.log(error);
      return;
    }

    setModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create User
      </button>

      {modalOpen && (
        <div className="fixed z-10 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div
            ref={modalRef}
            className="relative bg-white rounded-lg shadow dark:bg-gray-700"
          >
            {/* Aquí colocas tu formulario */}
            <form onSubmit={handleSubmit} className="w-full max-w-lg p-8">
              {/* Contenido del formulario */}
              <h2 className="block text-gray-300 text-xl font-bold mb-6">
                Registration Form
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-gray-300 text-sm font-bold mb-2"
                >
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="DEVELOPER">Developer</option>
                  <option value="MANAGER">Manager</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-gray-300 text-sm font-bold mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-gray-300 text-sm font-bold mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="user_last_name"
                  value={formData.user_last_name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-300 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-300 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Register
                </button>
              </div>
              {/* Botón para cerrar el modal */}
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
