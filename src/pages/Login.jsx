import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Lock, User, Users, Briefcase } from "lucide-react";
import { teamLogin } from "../services/operations/authAPI";
import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';

export const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {setTeam,setToken} = useContext(AuthContext); 

  const onSubmit = async(data) => {
    console.log("Logging in with:", data);
    await teamLogin(data,navigate,setTeam,setToken);
    // console.log(team,token);
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 p-6">
      {/* Left Section - Team & Department Info */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex flex-col items-center justify-center w-1/3 h-[70vh] p-8 bg-[#1C398E] text-white rounded-l-2xl shadow-lg"
      >
        <Users size={50} className="text-white" />
        <h3 className="text-xl font-semibold text-center">Team & Department Access</h3>
        <p className="text-center text-sm opacity-80">
          Login to manage your department, view employees, and track team progress.
        </p>
        <div className="flex items-center gap-2">
          <Briefcase size={20} />
          <span>HR, IT, Finance, Sales, and more...</span>
        </div>
      </motion.div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-center w-full max-w-sm h-[70vh] bg-white shadow-lg rounded-r-2xl p-10"
      >
        <h2 className="text-2xl font-semibold text-center text-[#1C398E]">Department Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-6">
          {/* User ID Input */}
          <div className="relative flex flex-col gap-1">
            <label htmlFor="userName" className="text-sm font-medium text-gray-600">
              User Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                id="userName"
                type="text"
                {...register("userName", { required: "User Name is required" })}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C398E] transition"
                placeholder="Enter your User Name"
              />
            </div>
            {errors.userId && <p className="text-red-500 text-sm">{errors.userId.message}</p>}
          </div>

          {/* Password Input */}
          <div className="relative flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C398E] transition"
                placeholder="Enter your Password"
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-[#1C398E] text-white py-2 rounded-lg font-semibold hover:bg-[#142A6E] transition"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
