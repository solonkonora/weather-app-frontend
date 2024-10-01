// "use client"
// import React, { useState } from 'react';
// import { baseUrlF, signupUrl } from '@/src/providers/constants/constants';
// import { useRouter } from 'next/navigation';
// import Spinner from '@/src/components/molecules/spinners';
// import Link from 'next/link';
// import Toast from '@/src/components/molecules/toast';
// import { toast } from 'react-toastify';

// const RegistrationForm = () => {
//   const router = useRouter()
//   const [values, setValues] = useState({
//     name: '',
//     email: '',
//     phoneNumber: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState({
//     name: '',
//     email: '',
//     phoneNumber: '',
//     password: '',
//   });
//   const notify = () => toast.success("Registration successful")
//   const failed = () => toast.warn("Registration Failed")
//   const [isLoading, setIsLoading] = useState(false)

//   function HandleValues(e: React.ChangeEvent<HTMLInputElement>) {
//     const { name, value } = e.target;
//     setValues((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   }

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = {
//       name: '',
//       email: '',
//       phoneNumber: '',
//       password: '',
//     };

//     if (!values.name.trim()) {
//       newErrors.name = 'Name is required';
//       isValid = false;
//     }

//     if (!values.email.trim()) {
//       newErrors.email = 'Email is required';
//       isValid = false;
//     } else if (!/\S+@\S+\.\S+/.test(values.email)) {
//       newErrors.email = 'Email is invalid';
//       isValid = false;
//     }

//     if (!values.phoneNumber.trim()) {
//       newErrors.phoneNumber = 'Phone number is required';
//       isValid = false;
//     }

//     if (!values.password.trim()) {
//       newErrors.password = 'Password is required';
//       isValid = false;
//     } else if (values.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters long';
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };


//   const handleRegister = async (e: any,) => {
//     e.preventDefault()
//     if (!validateForm()) {
//       return
//     }

//     setIsLoading(false)
//     const res = await fetch(signupUrl, {
//       method: "POST",
//       mode: "cors",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(values)
//     })
//     const response = await res.json();
//     if (response) {
//       const token = response.data;
//       if (typeof localStorage !== "undefined") {
//         localStorage.setItem("token", token)
//       }
//       setIsLoading(true)
//       notify()
//       router.push(baseUrlF + '/dashboard')
//     } else {
//       failed()
//       return "Failed to register"
//     }
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-blue-100 shadow-sm-blue-400">

//       <div className="bg-white shadow-md rounded-lg p-8 w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
//         <form>
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name='name'
//               value={values.name}
//               onChange={HandleValues}
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-500"
//               required
//             />
//             {errors.name && <p className="error-message text-red-500">{errors.name}</p>}

//           </div>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name='email'
//               value={values.email}
//               onChange={HandleValues}
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
//               required
//             />
//             {errors.email && <p className="error-message text-red-500">{errors.email}</p>}

//           </div>
//           <div className="mb-4">
//             <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
//               Phone Number
//             </label>
//             <input
//               type="text"
//               id="phoneNumber"
//               name='phoneNumber'
//               value={values.phoneNumber}
//               onChange={HandleValues}
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
//               required
//             />
//             {errors.phoneNumber && <p className="error-message text-red-500">{errors.phoneNumber}</p>}

//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name='password'
//               value={values.password}
//               onChange={HandleValues}
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
//               required
//             />
//             {errors.password && <p className="error-message text-red-500">{errors.password}</p>}

//           </div>
//           <button
//             disabled={isLoading}
//             type="submit"
//             className=" disabled:bg-slate-400 disabled:hover:cursor-wait w-full bg-blue-400 text-white font-semibold py-2 rounded-md hover:bg-blue-400 transition duration-200"
//             onClick={handleRegister}
//           >

//             {isLoading ? <Spinner /> : " SignUp"}


//           </button>
//           <p className="text-sm text-gray-600 mt-4">
//             Already have an account?{' '}
//             <Link href="/login" className="text-blue-500 hover:text-blue-600">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//       <Toast />
//     </div>
//   );
// };

// export default RegistrationForm


"use client";
import React, { useState } from "react";
import { baseUrlF, signupUrl } from "@/src/providers/constants/constants";
import { useRouter } from "next/navigation";
import Spinner from "@/src/components/molecules/spinners";
import Link from "next/link";
import Toast from "@/src/components/molecules/toast";
import { toast } from "react-toastify";

const RegistrationForm = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const notify = () => toast.success("Registration successful");
  const failed = (message: string) => toast.warn(message || "Registration Failed");

  function HandleValues(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
    };

    if (!values.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!values.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!values.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
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

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true); // Set loading to true before starting the request

    try {
      const res = await fetch(signupUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      setIsLoading(false); // Set loading back to false after fetch

      if (!res.ok) {
        const errorResponse = await res.json();
        failed(errorResponse.message || "Registration failed");
        return;
      }

      const response = await res.json();
      const token = response.data?.access_token; // Assuming access_token is returned in the response

      if (token) {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("token", token); // Store token in localStorage
        }
        notify();
        router.push(baseUrlF + "/dashboard"); // Redirect to dashboard
      } else {
        failed("Registration failed. No token returned.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Registration Error:", error);
      failed("An error occurred during registration.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 shadow-sm-blue-400">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={HandleValues}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-500"
              required
            />
            {errors.name && <p className="error-message text-red-500">{errors.name}</p>}
          </div>

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
              onChange={HandleValues}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
            {errors.email && <p className="error-message text-red-500">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={HandleValues}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
            {errors.phoneNumber && <p className="error-message text-red-500">{errors.phoneNumber}</p>}
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
              onChange={HandleValues}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
            {errors.password && <p className="error-message text-red-500">{errors.password}</p>}
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="disabled:bg-slate-400 disabled:hover:cursor-wait w-full bg-blue-400 text-white font-semibold py-2 rounded-md hover:bg-blue-400 transition duration-200"
            onClick={handleRegister}
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
