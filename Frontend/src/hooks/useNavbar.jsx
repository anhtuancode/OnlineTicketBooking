import { useState } from "react";
import { API_URL } from "../common/constant/app.constant";

export const useNavbarLogic = () => {
  const [activeTab, setActiveTab] = useState("MOVIES");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("London");
  const [selectedCinema, setSelectedCinema] = useState("Roudan");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const findMovies = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const tokenObj = JSON.parse(token);
      

      const res = await fetch(`${API_URL}/event`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenObj.accessToken}`,
        }
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
    findMovies
  };
};
