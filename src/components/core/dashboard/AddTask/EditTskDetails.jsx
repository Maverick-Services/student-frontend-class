import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../../Context/AuthContext';
import { AddTaskDetails } from './AddTaskDetails';
import { fetchCompleteTaskDetails } from '../../../../services/operations/taskAPI';
import { fetchTeamMembers } from '../../../../services/operations/teamAPI';
import { ShowTaskDetails } from '../ShowTaskDetails';
import { Spinner } from '../../../common/Spinner';

export const EditTaskDetails = () => {

  const {taskId} = useParams();
  const {token,task,editTask,setTask,setEditTask,loading,setLoading,team} = useContext(AuthContext);
  const [members, setMembers] = useState([]);
  const [showDetails, setShowDetails] = useState(true);

  const fetchTaskDetails = async()=>{
    setLoading(true);
    const result = await fetchCompleteTaskDetails({taskId});
    // console.log("result",result);
    if(result){
      setTask(result);
      setEditTask(true);
    }
    setLoading(false);
  }

  const fetchMemebrs = async()=>{
    // setLoading(true);
    const result = await fetchTeamMembers(token,{teamId:team?._id});
    if(result){
      setMembers(result);
    }
   
    // setLoading(false);
  }

  useEffect(()=>{
    // console.log(editUser)
    if(taskId){
      fetchTaskDetails(taskId);
    }else{
      setEditTask(false);
    }
  },[taskId])

    
  useEffect(()=>{
    if(task){
      fetchMemebrs();
    }
  },[task])

  if(loading){
    return <Spinner/>
  }

  return (
    <div className='w-full h-full'>
      {
        showDetails && task &&
        <ShowTaskDetails task={task} members={members} setShowDetails={setShowDetails} showDetails={showDetails} />
      }
      
      {
        !showDetails &&
        editTask && task && members &&
        <AddTaskDetails members={members} task={task} editTask={editTask}/>
      }
    </div>
  )
}
