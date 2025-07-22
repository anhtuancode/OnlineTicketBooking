import { useState, useEffect } from "react";
import { API_URL } from "../common/constant/app.constant";
import { useNavigate } from "react-router-dom";

export const useDetail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));

  const token = localStorage.getItem("token");
  const tokenObj = JSON.parse(token);

  useEffect(() => {
    try {
      if (tokenObj && tokenObj.accessToken) {
        setIsLogin(true);
      }
    } catch {
      setIsLogin(false);
    }
  }, []);

  const HandleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    navigate("/signin");
  };

  const handleDetail = async (id) => {
    setLoading(true);
    setError(""); 
    try{
        const response = await fetch(`${API_URL}/event/${id}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenObj?.accessToken}`,
            },
        });
        const data = await response.json();
        if(!response.ok) throw new Error(data.message || "Something went wrong");
        return data.data;
    }catch (err){
        setError(err.message || "Something went wrong");
        return null; 
    } finally {
        setLoading(false);
    }
  }

  const getShowtimesByTitleAndDate = async (title) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${API_URL}/event/search?title=${encodeURIComponent(title)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenObj?.accessToken}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");
      // Đảm bảo luôn trả về mảng
      return Array.isArray(data.data.items) ? data.data.items : [];
    } catch (err) {
      setError(err.message || "Something went wrong");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    isLogin,
    HandleLogout,
    handleDetail,
    getShowtimesByTitleAndDate,
  }
};
