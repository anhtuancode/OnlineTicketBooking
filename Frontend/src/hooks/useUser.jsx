import { useState } from "react";
import { API_URL } from "../common/constant/app.constant";

const useUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    phone: "",
  });
  const [users, setUsers] = useState([]);

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
      setStatusType("success");
      setStatusMessage(
        "✅ Người dùng được tạo với mật khẩu mặc định: 12345678"
      );
      setFormData({
        name: "",
        email: "",
        role: "user",
        phone: "",
      });

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.log(err);
      setStatusType("error");
      setStatusMessage(`❌ ${err.message}`);
    } finally {
      setTimeout(() => {
        setStatusMessage("");
        setStatusType("");
      }, 3000);
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

    setUsers(data.data || []);
    return data.data || [];
  };

  const toggleStatus = async (userId, currentStatus) => {
    const response = await fetch(`${API_URL}/user/toggle-status/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenObj.accessToken}`,
      },
      body: JSON.stringify({
        status: currentStatus === 1 ? 0 : 1,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    console.log(data);

    return data.data;
  };

  const handleDeleted = async (userId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (!confirm) return;
      const response = await fetch(`${API_URL}/user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenObj.accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setStatusType("success");
      setStatusMessage("Đã xóa người dùng thành công ✅");
      setSuccess(true);
      await renderUser();
    } catch (err) {
      console.log(err);
      setStatusType("error");
      setStatusMessage(`❌ ${err.message}`);
    } finally {
      setTimeout(() => {
        setStatusMessage("");
        setStatusType("");
      }, 3000);
    }
  };

  const fetchUserById = async (id) => {
    try {
      const response = await fetch(`${API_URL}/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenObj.accessToken}`,
        },
      });
      if (!response.ok) throw new Error("Can not get User'information");

      const data = await response.json();

      return data.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (id, updatedUser) => {
    try {
      const response = await fetch(`${API_URL}/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenObj.accessToken}`,
        },
        body: JSON.stringify(updatedUser),
      });
      console.log(response, id);
      if (!response.ok) throw new Error("Can not get User'information");

      const data = await response.json();

      setSuccess(true);
      setStatusMessage("✅ Cập nhật thông tin người dùng thành công");
      setStatusType("success");

      return true;
    } catch (err) {
      console.log(err);
      setStatusType("error");
      setStatusMessage(`❌ ${err.message}`);
    } finally {
      setTimeout(() => {
        setStatusMessage("");
        setStatusType("");
      }, 3000);
    }
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    handleEdit,
    loading,
    error,
    success,
    setSuccess,
    setError,
    setFormData,
    renderUser,
    toggleStatus,
    setStatusMessage,
    setStatusType,
    statusMessage,
    statusType,
    handleDeleted,
    setUsers,
    users,
    fetchUserById,
  };
};

export default useUser;
