import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../common/constant/app.constant";
export const useForgot = () => {
    const navigatePage = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirm_password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(""); // Clear error when user types
    };

     const validateForm = () =>{
        if(form.password !== form.confirm_password){
          setError("Passwords do not match");
          return false;
        }
        return true;
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        setError("");

        if(!validateForm()){
            return;
        }

        try{
            const reponse = await fetch(`${API_URL}/auth/forgot-password`,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await reponse.json();

            if(!reponse.ok){
                throw new Error(data.message || "Change password failed");
            }

            alert("Change password successful!!");
            navigatePage("/signin");
        }catch(err){
            setError(err.message);
        }finally{
            setLoading(false);
        }
    };

    return { form, loading, error, handleChange, handleSubmit };
}