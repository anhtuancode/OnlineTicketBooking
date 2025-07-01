import { API_URL } from "../common/constant/app.constant";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const useSignup = () => {
  const navigatePage = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
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
    if(form.password.length < 6){
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  }
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    
    if(!validateForm()){
        return;
    }

    setLoading(true);
    setError("");

    try{
        const response = await fetch(`${API_URL}/auth/signup`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || "Signup failed");
        }

        alert("Signup successful!!");
        navigatePage("/signin");
    }catch(err){
        setError(err.message || "Signup failed");
    }finally{
        setLoading(false);
    }
  }
  return { form, loading, error, handleChange, handleSubmit };
};
