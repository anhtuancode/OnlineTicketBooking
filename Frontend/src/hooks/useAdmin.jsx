import { API_URL } from "../common/constant/app.constant";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const tokenObj = JSON.parse(token);

  const getToken = () => {
    const token = localStorage.getItem("token");
    try {
      const tokenObj = JSON.parse(token);
      if (!tokenObj?.accessToken) throw new Error();
      return tokenObj.accessToken;
    } catch {
      alert("Vui lòng đăng nhập để tiếp tục");
      navigate("/signin");
      throw new Error("No token");
    }
  };

  getToken();
  
  
  const handleCountUser = async () => {
    try {
      const reponse = await fetch(`${API_URL}/user/count`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenObj?.accessToken}`,
        },
      });

      const data = await reponse.json();

      if (!reponse.ok) {
        throw new Error(data.message || "Count user successfully");
      }

      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCountEvent = async () => {
    try {
      const reponse = await fetch(`${API_URL}/event/count`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenObj?.accessToken}`,
        },
      });

      const data = await reponse.json();

      if (!reponse.ok) {
        throw new Error(data.message || "Count user successfully");
      }

      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCountTicket = async () => {
    try {
      const reponse = await fetch(`${API_URL}/booking/count`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenObj?.accessToken}`,
        },
      });

      const data = await reponse.json();

      if (!reponse.ok) {
        throw new Error(data.message || "Count user successfully");
      }
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTotal = async () => {
    try {
      const reponse = await fetch(`${API_URL}/booking/total`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
            Authorization: `Bearer ${tokenObj?.accessToken}`,
        },
      });

      const data = await reponse.json();

      if (!reponse.ok) {
        throw new Error(data.message || "Count user successfully");
      }
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleCountUser,
    handleCountEvent,
    handleCountTicket,
    handleTotal,
    loading,
    error,
  };
};
