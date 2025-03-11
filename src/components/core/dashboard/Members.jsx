import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { users } from "../../../data/dummy";
import { fetchTeamMembers } from "../../../services/operations/teamAPI";
import { AuthContext } from "../../../Context/AuthContext";
import { Spinner } from "../../common/Spinner";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Members = () => {
  
  const {token,loading,setLoading,team} = useContext(AuthContext);
  const [members, setMembers] = useState([]);

  const fetchMemebrs = async()=>{
    setLoading(true);
    const result = await fetchTeamMembers(token,{teamId:team?._id});
    if(result){
      setMembers(result);
    }
   
    setLoading(false);
  }

  useEffect(()=>{
    fetchMemebrs();
  },[]);

  if(loading)
    return <Spinner/>

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-[#1C398E]">All Members</h1>

      <motion.div
        initial="hidden"
        animate="visible"
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-full"
      >
        {members && !members.length ? (
          <motion.p variants={cardVariants} className="text-gray-600 text-lg text-center col-span-full">
            No Members added yet
          </motion.p>
        ) : (
          members?.map((ms) => (
            <motion.div
              key={ms?._id}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-fit p-4 flex flex-col gap-3"
            >
              <Link 
                // to={`/dashboard/members/${ms?._id}`} 
                to={"#"}
                className="w-full"
              >
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col gap-2 transition-all hover:shadow-xl">
                  <h3 className="text-lg font-semibold text-gray-800">Name: {ms?.name}</h3>
                  <p className="text-gray-600">Email: {ms?.email}</p>
                  <p className="text-gray-600">Mobile No: {ms?.phoneNo}</p>
                  <p className="text-gray-600">
                    Tasks Assigned:{" "}
                    <span className="font-semibold text-[#1C398E]">{ms?.tasks?.length}</span>
                  </p>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default Members;
