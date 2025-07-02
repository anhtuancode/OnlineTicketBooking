import { useState } from "react";
import { API_URL } from "../common/constant/app.constant";

const useUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    phone: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const token = localStorage.getItem("token");
  const tokenObj = JSON.parse(token);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      const response = await fetch(`${API_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenObj.accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        role: "user",
        phone: "",
      });

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const renderUser = async () => {
    const response = await fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenObj.accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data.data || [];
  };

  const toggleStatus = async (userId, currentStatus) =>{
    const response = await fetch(`${API_URL}/user/toggle-status/${userId}`, {
      method: "PUT",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenObj.accessToken}`,
      },
      body: JSON.stringify({
        status: currentStatus === 0 ? 1 : 0
      })
    })

    const data = await response.json();

    if(!response.ok){
      throw new Error(data.message || "Something went wrong");
    }

    console.log(data);

    return data.data;
  }

  return {
    formData,
    handleInputChange,
    handleSubmit,
    loading,
    error,
    success,
    setSuccess,
    setFormData,
    renderUser,
    toggleStatus,
    setStatusMessage,
    setStatusType,
    statusMessage,
    statusType
  };
};

export default useUser;
