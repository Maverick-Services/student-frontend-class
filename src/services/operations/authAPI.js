import { apiConnector } from "../apiconnector";
import { authEndpoints } from "../apis";
import { toast } from 'react-hot-toast';

const {
    TEAM_LOGIN_API
} = authEndpoints;

export async function teamLogin(formData,navigate,setTeam,setToken){
    let toastId = toast.loading("Logging In")
    try {
        
        const response = await apiConnector(
            "POST",
            TEAM_LOGIN_API,
            formData
        );

        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }

        // console.log("TEAM_LOGIN_API_RESPONSE:",response);
        setTeam(response?.data?.data?.team);
        setToken(response?.data?.data?.token);
        
        toast.dismiss(toastId);
        navigate('/dashboard/profile');
        toast.success(response?.data?.message);       
        
    } catch (err) {
        console.log("TEAM_LOGIN_API_ERROR:",err);
        toast.dismiss(toastId);
        toast.error(err?.response?.data?.message || err?.message);
    }
}

export function logout(navigate,setTeam,setToken){
    setToken(null);
    setTeam(null);
    // dispatch(resetCart());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged Out");
    navigate("/");
}