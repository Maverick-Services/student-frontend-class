import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchTeamTasks } from "../../../services/operations/taskAPI";
import { AuthContext } from "../../../Context/AuthContext";
import { Spinner } from '../../common/Spinner';
import { formattedFullDate } from "../../../utils/dateFormatter";
import { STATUS } from "../../../utils/constants";

const MyTasks = () => {
  // const { tasks } = useContext(AuthContext);
    
  const {token,loading,setLoading} = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async()=>{
    setLoading(true);
    const result = await fetchTeamTasks(token);
    if(result){
      setTasks(result);
    }

    setLoading(false);
  }

  useEffect(()=>{
    fetchTasks();
  },[]);

  if(loading)
    return <Spinner/>

  return (
    <div className="w-full min-h-screen p-6 flex flex-col gap-5 bg-gray-100">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-[#1C398E] text-center mb-8">
        Team Tasks
      </h1>

      {/* Responsive Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tasks && tasks.length === 0 ? (
          <p className="text-center text-xl text-gray-600 col-span-full">
            No Tasks assigned to you yet
          </p>
        ) : (
          tasks.map((ts, index) => (
            <Link key={ts?._id} to={`/dashboard/tasks/${ts?._id}`} className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                }}
                className="w-full bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 cursor-pointer flex flex-col gap-2 items-start"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  Task Name: {ts?.name}
                </h3>
                <p className="text-gray-700">
                  <span className="font-medium">Steps:</span> {ts?.steps?.length}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Created At:</span> {formattedFullDate(ts?.createdAt)}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Deadline:</span> {formattedFullDate(ts?.deadline)}
                </p>
                <span className={`p-[0.2rem] px-[0.5rem] rounded-full text-sm font-medium text-white ${
                  ts?.status === STATUS.COMPLETED ? "bg-green-500" : "bg-red-500"
                }`}>{ts?.status}</span>
              </motion.div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default MyTasks;
