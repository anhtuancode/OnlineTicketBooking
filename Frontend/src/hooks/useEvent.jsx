import { useState } from "react";
import { API_URL } from "../common/constant/app.constant";

const useEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    date: "",
    image: null,
    showTime: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [events, setEvents] = useState([]);

  const token = localStorage.getItem("token");
  const tokenObj = JSON.parse(token);

  const loadEvents = async () => {
    const data = await handleEvents();
    if (data) setEvents(data);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setError("");
    setSuccess(false);
  };

  const handleSubmit = async () => {
    try {
      console.log(formData);
      setLoading(true);
      setError("");
      setSuccess(false);

      setFieldErrors({}); // reset lỗi cũ

      const newErrors = {};

      if (!formData.title.trim()) newErrors.title = "Vui lòng nhập tiêu đề";
      if (!formData.type) newErrors.type = "Vui lòng chọn thể loại";
      if (!formData.date) newErrors.date = "Vui lòng chọn ngày";
      if (!formData.image) newErrors.image = "Vui lòng chọn hình ảnh";

      const showTimeNumber = Number(formData.showTime);
      if (!formData.showTime || isNaN(showTimeNumber) || showTimeNumber <= 0) {
        newErrors.showTime = "Thời lượng phải là số dương";
      }

      if (Object.keys(newErrors).length > 0) {
        setFieldErrors(newErrors);
        throw new Error("Vui lòng kiểm tra lại các trường nhập");
      }

      const form = new FormData();
      form.append("title", formData.title);
      form.append("type", formData.type);
      form.append("date", formData.date);
      form.append("showTime", showTimeNumber);
      form.append("image", formData.image);

      const response = await fetch(`${API_URL}/event`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenObj.accessToken}`,
        },
        body: form,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(true);
      setStatusType("success");
      setStatusMessage(`Thêm mới ${formData.type} thành công ✅`);
      setFormData({
        title: "",
        type: "",
        date: "",
        showTime: "",
        image: null,
      });

      await loadEvents();
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
      setLoading(false);
    }
  };

  const handleEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/event`, {
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

      return data.data;
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) return dateString;

    // Format as DD/MM/YYYY
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
      setLoading(true);
      setError("");
      setSuccess(false);

      const response = await fetch(`${API_URL}/event/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokenObj.accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      await loadEvents();
      setSuccess(true);
      setStatusType("success");
      setStatusMessage(`Xóa ${formData.title} thành công ✅`);
      setFormData({
        title: "",
        type: "",
        date: "",
        showTime: "",
        image: null,
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
      setLoading(false);
    }
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    loading,
    error,
    success,
    setSuccess,
    setFormData,
    setError,
    handleEvents,
    statusMessage,
    statusType,
    fieldErrors,
    formatDate,
    handleDelete,
    loadEvents,
    events,
    setEvents,
  };
};

export default useEvent;
