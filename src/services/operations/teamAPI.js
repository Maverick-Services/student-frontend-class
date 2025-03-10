import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { teamEndpoints } from "../apis";


const {
    FETCH_TEAM_MEMBERS_API
} = teamEndpoints

export const fetchTeamMembers = async(token,formData)=>{
    try {
        
        const response = await apiConnector(
            "POST",
            FETCH_TEAM_MEMBERS_API,
            formData,
            {
                "Authorization":`Bearer ${token}`
            }
        )

        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }

        // console.log("FETCH_TEAM_MEMBERS_API_RESPONSE:",response);
        toast.success(response?.data?.message);
        return response?.data?.data;
        
    } catch (err) {
        console.log("FETCH_TEAM_MEMBERS_API_ERROR:",err);
        toast.error(err?.response?.data?.message || err?.message)
        return null;
    }
}