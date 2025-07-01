import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { API_URL } from "../common/constant/app.constant";


export const useSignin = () => {
    const navigatePage = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password:"",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(""); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Xử lý đăng nhập ở đây

        setLoading(true);
        setError("");

        try{
            const reponse = await fetch(`${API_URL}/auth/signin`,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await reponse.json();

            if(!reponse.ok){
                throw new Error(data.message || "Signin failed");
            }

            alert("Signin successful!!");
            navigatePage("/");

        }catch(err){
            setError(err.message);
        }finally{
            setLoading(false);
        }
    };

    return {form, loading, error, handleChange, handleSubmit};
}