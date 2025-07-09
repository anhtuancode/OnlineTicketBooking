import { API_URL } from "../common/constant/app.constant";
import { useState } from "react";
export const useAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const handleCountUser = async () => {
        try{
            const reponse = await fetch(`${API_URL}/user/count`,{
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                },
            });

            const data = await reponse.json();

            if(!reponse.ok){
                throw new Error(data.message || "Count user successfully");
            }

            return data;

        }catch(err){
            setError(err.message);
        }finally{
            setLoading(false);
        }
    };

    const handleCountEvent = async () => {
        try{
            const reponse = await fetch(`${API_URL}/event/count`,{
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                },
            });

            const data = await reponse.json();

            if(!reponse.ok){
                throw new Error(data.message || "Count user successfully");
            }

            return data;

        }catch(err){
            setError(err.message);
        }finally{
            setLoading(false);
        }
    };

    return {handleCountUser, handleCountEvent, loading, error};
}