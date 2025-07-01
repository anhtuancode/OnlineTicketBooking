import { useState, useEffect } from "react";
import { API_URL } from "../common/constant/app.constant";
import { useNavigate } from "react-router-dom";

export const useNavbarLogic = () => {
  const [activeTab, setActiveTab] = useState("MOVIES");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("London");
  const [selectedCinema, setSelectedCinema] = useState("Roudan");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));

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

  const findMovies = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_URL}/event`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenObj.accessToken}`,
        },
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");
    } catch (err) {
      setError(err.message);
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
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
    findMovies,
    isLogin,
    setIsLogin,
    HandleLogout,
  };
};
