"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/src/components/molecules/spinners";
import Link from "next/link";
import Toast from "@/src/components/molecules/toast";
import { toast } from "react-toastify";
import { API_BASE_URL } from "@/src/providers/constants/constants";

const RegistrationForm = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const notifySuccess = (message: string) => toast.success("Registration successful");
  const notifyError = (message: string) => toast.warn(message || "Registration Failed");

  function handleValues(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      username: "",
      email: "",
      password: "",
    };

    if (!values.username.trim()) {
      newErrors.username = "Name is required";
      isValid = false;
    }

    if (!values.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }
    if (!values.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("form validation failed")
      return;
    }

    setIsLoading(true);
    console.log("Submitting registration with values:", values);

    try {
      const res = await fetch(API_BASE_URL + "/auth/signup", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      console.log("Response status:", res.status)
      if (!res.ok) {
        const errorResponse = await res.json();
        notifyError(errorResponse.message || "Registration failed");
        return;
      }

      const response = await res.json();
      const token = response.data?.token;

      if (token) {
        localStorage.setItem("token", token);
       } 
      notifySuccess("successfully Registered");

      // Redirect to the login page after successful registration
      router.push("/login")

    } catch (error) {
      console.error("Registration Error:", error);
      notifyError("An error occurred during registration.");
    } finally {
      setIsLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 shadow-sm-blue-400">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-black"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={values.username}
              onChange={handleValues}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:blue-purple-500"
              required
            />
            {errors.username && <p className="error-message text-red-500">{errors.username}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleValues}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
            {errors.email && <p className="error-message text-red-500">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleValues}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
            {errors.password && <p className="error-message text-red-500">{errors.password}</p>}
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="disabled:bg-slate-400 disabled:hover:cursor-wait w-full bg-blue-400 text-white font-semibold py-2 rounded-md hover:bg-blue-400 transition duration-200"
          >
            {isLoading ? <Spinner /> : "Sign Up"}
          </button>

          <p className="text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:text-blue-600">
              Login
            </Link>
          </p>
        </form>
      </div>
      <Toast />
    </div>
  );
};

export default RegistrationForm;