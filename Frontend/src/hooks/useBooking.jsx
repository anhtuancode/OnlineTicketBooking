import { API_URL } from "../common/constant/app.constant";
import { useEffect, useState } from "react";
export const useBooking = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [bookings, setBookings] = useState([]);

  const token = localStorage.getItem("token");
  const tokenObj = JSON.parse(token);

  if (!tokenObj?.accessToken) {
    alert("Vui lòng đăng nhập để đặt vé");
    throw new Error("Vui lòng đăng nhập để đặt vé");
  }

  const loadBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/booking`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenObj?.accessToken}`,
        },
      });
      if (!response.ok) throw new Error("Không thể tải danh sách đặt vé");
      const data = await response.json();

      const bookingsList = Array.isArray(data.data) ? data.data : [];

      setBookings(bookingsList);
    } catch (err) {
      setBookings([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id, newStatus) => {
    setLoading(true);
    setError(""); // reset error
    try {
      const response = await fetch(`${API_URL}/booking/update-status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenObj?.accessToken}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Không thể cập nhật trạng thái");
      }

      await loadBookings(); // <-- Gọi lại loadBookings để lấy danh sách mới nhất
      setSuccess(true);
      setStatusType("success");
      setStatusMessage("✅ Cập nhật trạng thái đặt vé thành công");
    } catch (err) {
      setError(true);
      setStatusType("error");
      setStatusMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, setSuccess]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  return {
    bookings,
    statusMessage,
    setStatusMessage,
    statusType,
    setStatusType,
    success,
    setSuccess,
    loadBookings,
    loading,
    error,
    toggleStatus,
  };
};
