// import { useForm, SubmitHandler } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { UserRound, ArrowRight, FolderPen } from "lucide-react";
// import { PEOPLES_IMAGES } from "./../../images";

// interface FormValues {
//   username: string;
//   name: string;
// }

// export const SignIn = () => {
//   const schema = yup.object().shape({
//     username: yup
//       .string()
//       .required("Usrname is required")
//       .matches(/^[a-zA-Z0-9_.@$]+$/, "incalid user name"),
//     name: yup.string().required("name is require"),
//   });

//   const onSubmit: SubmitHandler<FormValues> = async (data, event) => {
//     const { username, name } = data;
//     const response = await fetch("http://localhost:3000/auth/createUser", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username,
//         name,
//         image: PEOPLES_IMAGES[Math.random() * PEOPLES_IMAGES.length],
//       }),
//     });
//     if (!response.ok) {
//       alert("An error occurred while creating the user");
//       return;
//     }
//     const responseData = await response.json();

//     console.log(responseData);
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormValues>({ resolver: yupResolver(schema) });

//   return (
//     <div className="min-h-screen bg-black flex flex-col justify-center items-center p-4">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-white mb-2 relative inline-block">
//             Audio Wave
//             <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-500 animate-pulse"></span>
//           </h1>
//           <p className="text-gray-400">Connect through sound</p>
//         </div>

//         <div className="bg-gray-900 rounded-lg shadow-xl p-8 relative overflow-hidden border border-gray-800">
//           <div className="audio-wave"></div>

//           <form onSubmit={handleSubmit(onSubmit)} className="relative z-10">
//             <div className="mb-6">
//               <label
//                 htmlFor="username"
//                 className="block text-sm font-medium text-gray-300 mb-2"
//               >
//                 username
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   {...register("username")}
//                   className="w-full px-4 py-2 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10"
//                   placeholder=" username"
//                   required
//                 />
//                 <UserRound className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />

//                 {errors.username && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.username.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="mb-6">
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-medium text-gray-300 mb-2"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   {...register("name")}
//                   className="w-full px-4 py-2 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10"
//                   placeholder="name"
//                   required
//                 />
//                 <FolderPen className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />

//                 {errors.name && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.name.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-purple-600 text-white rounded-md py-2 px-4 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black transition-colors duration-300 flex items-center justify-center"
//             >
//               Sign Up
//               <ArrowRight className="ml-2 h-5 w-5" />
//             </button>
//           </form>
//         </div>

//         <p className="text-center mt-4 text-gray-400">
//           Already have an account?{" "}
//           <a href="#" className="text-purple-400 hover:text-purple-300">
//             Log in
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Contact, ArrowRight, Folder } from "lucide-react"; // Replace with valid icons
import { PEOPLES_IMAGES } from "./../../images";
import Cookies from "universal-cookie";
import { StreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "../../user-context";
import { useNavigate } from "react-router-dom";

interface FormValues {
  username: string;
  name: string;
}

export const SignIn = () => {
  const cookies = new Cookies();
  const { setClient, setUser } = useUser();
  const navigate = useNavigate();

  // Validation schema using Yup
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .matches(/^[a-zA-Z0-9_.@$]+$/, "Invalid username"),
    name: yup.string().required("Name is required"),
  });

  const onSubmit: SubmitHandler<FormValues> = async (
    data,
    event?: React.BaseSyntheticEvent
  ) => {
    event?.preventDefault();
    const { username, name } = data;
    const randomImage =
      PEOPLES_IMAGES[Math.floor(Math.random() * PEOPLES_IMAGES.length)];

    try {
      // Call the backend API to create a user https://audiowave.onrender.com
      // const response = await fetch("http://localhost:3000/auth/createUser", {
        const response = await fetch("https://audiowave.onrender.com/auth/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          name,
          image: randomImage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "An error occurred while creating the user");
        return;
      }

      // Extract response data
      const responseData = await response.json();
      console.log(responseData);

      // Initialize StreamVideoClient
      const myClient = new StreamVideoClient("9bva86s3fcpk"); // Replace with your Stream API key
      await myClient.connectUser(
        { id: username, name },
        responseData.data.token // Pass the token from the backend
      );

      // Set user and client in the global state
      setClient(myClient);
      setUser({ username, name });

      // Set cookies
      const expires = new Date();
      expires.setDate(expires.getDate() + 1);
      cookies.set("token", responseData.data.token, { expires });
      cookies.set("username", username, { expires });
      cookies.set("name", name, { expires });

      navigate("/main");
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 -mt-[160px]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 relative inline-block">
            Audio Wave
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-500 animate-pulse"></span>
          </h1>
          <p className="text-gray-400">Connect through sound</p>
        </div>

        <div className="bg-gray-900 rounded-lg shadow-xl p-8 border border-gray-800">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("username")}
                  className="w-full px-4 py-2 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10"
                  placeholder="Username"
                />
                <Contact className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("name")}
                  className="w-full px-4 py-2 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10"
                  placeholder="Name"
                />
                <Folder className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white rounded-md py-2 px-4 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black transition-colors duration-300 flex items-center justify-center"
            >
              Sign Up
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </form>
        </div>

        <p className="text-center mt-4 text-gray-400">
          Already have an account?{" "}
          <a href="#" className="text-purple-400 hover:text-purple-300">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};
