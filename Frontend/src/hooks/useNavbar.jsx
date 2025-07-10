import { useState, useEffect } from "react";
import { API_URL } from "../common/constant/app.constant";
import { useNavigate } from "react-router-dom";

export const useNavbarLogic = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Hồ Chí Minh");
  const [selectedCinema, setSelectedCinema] = useState("Roudan");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));
  const [events, setEvents] = useState([]); 

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const tokenObj = JSON.parse(token);

  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      const tokenObj = JSON.parse(token);
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

  const handleAllMovies = async () => {
    try {
      setError("");
      const res = await fetch(`${API_URL}/event`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenObj?.accessToken}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      setEvents(data.data);
      return data.data;
    } catch (err) {
      setError(err.message);
      setEvents([]); // Nếu lỗi thì clear danh sách event
      console.error("Error fetching events:", err);
    } 
  };

  const handleFindMovies = async () => {
    try{
      setError("");

      const response = await fetch(`${API_URL}/event/movies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenObj?.accessToken}`,
        },
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Something went wrong");
      setEvents(data.data);
      return data.data;      
    }catch (err){
      setError(err.message);
      setEvents([]); 
      console.error("Error fetching events:", err);
    }
  };

  const handleFindEvents = async () => {
    try{
      setError("");

      const response = await fetch(`${API_URL}/event/events`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenObj?.accessToken}`,
        },
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Something went wrong");
      setEvents(data.data);
      return data.data;      
    }catch (err){
      setError(err.message);
      setEvents([]); 
      console.error("Error fetching events:", err);
    }
  };

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedCity,
    setSelectedCity,
    selectedCinema,
    setSelectedCinema,
    loading,
    error,
    handleAllMovies,
    isLogin,
    setIsLogin,
    HandleLogout,
    events, 
    setEvents,
    handleFindMovies,
    handleFindEvents
  };
};
