import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { taskEndpoints } from "../apis";

const {
    CREATE_TASK_API,
    EDIT_TASK_API,
    DELETE_TASK_API,
    FETCH_TASKS_API,
    FETCH_COMPLETE_TASK_DETAILS_API,
    CREATE_STEP_API,
} = taskEndpoints;

export const createTask = async(formData,token)=>{
    let toastId = toast.loading("Creating Task")
    try {
        
        const response = await apiConnector(
            "POST",
            CREATE_TASK_API,
            formData,
            {
                "Authorization":`Bearer ${token}`
            }
        );

        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }

        // console.log("CREATE_TASK_API_RESPONSE:",response);
        toast.dismiss(toastId);
        toast.success(response?.data?.message);       
        return response?.data?.data;
        
    } catch (err) {
        console.log("CREATE_TASK_API_ERROR:",err);
        toast.dismiss(toastId);
        toast.error(err?.response?.data?.message || err?.message);
        return null;
    }
}

export const editTaskDetails = async(formData,token)=>{
    let toastId = toast.loading("Editing Task")
    try {
        
        const response = await apiConnector(
            "PUT",
            EDIT_TASK_API,
            formData,
            {
                "Authorization":`Bearer ${token}`
            }
        );

        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }

        // console.log("EDIT_TASK_API_RESPONSE:",response);
        toast.dismiss(toastId);
        toast.success(response?.data?.message);       
        return response?.data?.data;
        
    } catch (err) {
        console.log("EDIT_TASK_API_ERROR:",err);
        toast.dismiss(toastId);
        toast.error(err?.response?.data?.message || err?.message);
        return null;
    }
}

export const fetchTeamTasks = async(token)=>{
    try {
        
        const response = await apiConnector(
            "GET",
            FETCH_TASKS_API,
            null,
            {
                "Authorization":`Bearer ${token}`
            }
        )

        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }

        // console.log("FETCH_TEAM_TASKS_API_RESPONSE:",response);
        toast.success(response?.data?.message);
        return response?.data?.data;
        
    } catch (err) {
        console.log("FETCH_TEAM_TASKS_API_ERROR:",err);
        toast.error(err?.response?.data?.message || err?.message)
        return null;
    }
}

export const fetchCompleteTaskDetails = async(formData)=>{
    let toastId = toast.loading("fetching details");
    try {
        const response = await apiConnector(
            "POST",
            FETCH_COMPLETE_TASK_DETAILS_API,
            formData,
        );

        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }

        toast.dismiss(toastId);
        // console.log("FETCH_COMPLETE_TASK_DETAILS_API_RESPONSE",response);
        return response?.data?.data;

    } catch (err) {
        console.log("FETCH_COMPLETE_TASK_DETAILS_API_ERROR",err);
        toast.dismiss(toastId);
        toast.error(err?.response?.data?.message || err?.message);
        return null;
    }
}

export const createStep = async(formData,token)=>{
    let toastId = toast.loading("Creating Step")
    try {
        
        const response = await apiConnector(
            "POST",
            CREATE_STEP_API,
            formData,
            {
                "Authorization":`Bearer ${token}`
            }
        );

        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }

        // console.log("CREATE_STEP_API_RESPONSE:",response);
        toast.dismiss(toastId);
        toast.success(response?.data?.message);       
        return response?.data?.data;
        
    } catch (err) {
        console.log("CREATE_STEP_API_ERROR:",err);
        toast.dismiss(toastId);
        toast.error(err?.response?.data?.message || err?.message);
        return null;
    }
}
