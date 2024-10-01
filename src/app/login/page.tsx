// "use client"

// import React, { useState } from 'react';
// import { baseUrlF, loginUrl } from '@/src/providers/constants/constants';
// import { useRouter } from 'next/navigation';
// import Spinner from '@/src/components/molecules/spinners';
// import Link from 'next/link';
// import Toast from '@/src/components/molecules/toast';
// import { toast } from 'react-toastify';


// const LoginForm = () => {
//   const router = useRouter();
//   const [values, setValues] = useState({
//     email: '',
//     password: '',
//   });
//   const [errors, setErrors] = useState({
//     email: '',
//     password: '',
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const notify = () => toast.success("Login successful")
//   const failed = () => toast.warn("Login Failed")

//   const validateForm = () => {
//     let isValid = true;
//     const newError = {
//       email: "",
//       password: ""
//     }

//     if (!values.password.trim()) {
//       isValid = false
//       newError.password = "Password is required"
//     } else if (values.password.length < 2) {
//       newError.password = 'Password must be at least 2 characters long';
//       isValid = false;
//     }

//     if (!/\S+@\S+\.\S+/.test(values.email)) {
//       newError.email = 'Email is invalid';
//       isValid = false;
//     }
//     setErrors(newError)
//     return isValid
//   }

//   function handleValues(e: React.ChangeEvent<HTMLInputElement>) {
//     const { name, value } = e.target;
//     setValues((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   }

//   const handleRegister = async (e: any) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       return
//     }
//     setIsLoading(true);
//     const res = await fetch(loginUrl, {
//       method: 'POST',
//       mode: 'cors',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(values),
//     });

//     setIsLoading(false);

//     const response = await res.json()
//     const data = response.data
//     if (data !== null) {
//       const token = response.data;
//       if (typeof localStorage !== "undefined") {
//         localStorage.setItem("token", token)
//       }
//       setIsLoading(true)
//       notify()
//       router.push(baseUrlF + '/dashboard')
//     }
    
//     if(data === null) {
//       setErrors({email:"Email not Found", password:"Wrong Password"})
//       failed()
//       return "Failed to register"
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-blue-100">

//       <div className="bg-white shadow-md rounded-lg p-8 w-90 shadow-blue-400">
//         <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
//         <form>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={values.email}
//               onChange={handleValues}
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-500"
//               required
//             />
//             {errors.email && <p className="error-message text-red-500">{errors.email}</p>}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={values.password}
//               onChange={handleValues}
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-500"
//               required
//             />
//             {errors.password && <p className="error-message text-red-500">{errors.password}</p>}

//           </div>

//           <button
//             disabled={isLoading}
//             type="submit"
//             className=" disabled:bg-slate-400 disabled:hover:cursor-wait w-full bg-blue-400 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
//             onClick={handleRegister}
//           >
//             {isLoading ? <Spinner /> : 'Login'}
//           </button>
//         </form>
//         <p className="text-sm text-gray-800 mt-4">
//           Don't have an account?{' '}
//           <Link href="/register" className="text-blue-400 hover:text-blue-600">
//             Register
//           </Link>
//         </p>
//       </div>
//       <Toast />

//     </div>
//   );
// };

// export default LoginForm;


"use client";

import React, { useState } from "react";
import { baseUrlF, loginUrl } from "@/src/providers/constants/constants";
import { useRouter } from "next/navigation";
import Spinner from "@/src/components/molecules/spinners";
import Link from "next/link";
import Toast from "@/src/components/molecules/toast";
import { toast } from "react-toastify";

const LoginForm = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const notify = () => toast.success("Login successful");
  const failed = (message: string) => toast.warn(message || "Login Failed");

  // Validation function
  const validateForm = () => {
    let isValid = true;
    const newError = {
      email: "",
      password: "",
    };

    if (!values.password.trim()) {
      isValid = false;
      newError.password = "Password is required";
    } else if (values.password.length < 2) {
      newError.password = "Password must be at least 2 characters long";
      isValid = false;
    }

    if (!/\S+@\S+\.\S+/.test(values.email)) {
      newError.email = "Email is invalid";
      isValid = false;
    }

    setErrors(newError);
    return isValid;
  };

  // Handle input changes
  function handleValues(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  // Handle login submission
  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(loginUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      setIsLoading(false);

      // Handle non-success responses
      if (!res.ok) {
        const errorResponse = await res.json();
        failed(errorResponse.message || "Login failed");
        return;
      }

      const response = await res.json();
      const token = response.access_token; // Ensure that access_token is been returned from the backend

      if (token) {
        // Store the token
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("token", token);
        }
        notify();
        router.push(baseUrlF + "/dashboard");
      } else {
        setErrors({ email: "Email not Found", password: "Wrong Password" });
        failed("Invalid credentials");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error during login", error);
      failed("An error occurred during login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-90 shadow-blue-400">
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleValues}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-500"
              required
            />
            {errors.email && (
              <p className="error-message text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleValues}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-500"
              required
            />
            {errors.password && (
              <p className="error-message text-red-500">{errors.password}</p>
            )}
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="disabled:bg-slate-400 disabled:hover:cursor-wait w-full bg-blue-400 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
            onClick={handleLogin}
          >
            {isLoading ? <Spinner /> : "Login"}
          </button>
        </form>
        <p className="text-sm text-gray-800 mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-400 hover:text-blue-600">
            Register
          </Link>
        </p>
      </div>
      <Toast />
    </div>
  );
};

export default LoginForm;
