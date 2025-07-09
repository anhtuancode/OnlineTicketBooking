import { useState } from "react";
import { API_URL } from "../common/constant/app.constant";

const useEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    date: "",
    image: null,
    showTime: "",
    startTime: "",
    price: "",
    seats: "",
    location: "",
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

      const newErrors = {};

      // Reset lỗi cũ khi submit mới
      setFieldErrors({});

      // Validate các trường
      if (!formData.title.trim()) newErrors.title = "Vui lòng nhập tiêu đề";
      if (!formData.type) newErrors.type = "Vui lòng chọn thể loại";
      if (!formData.date) newErrors.date = "Vui lòng chọn ngày";
      if (!formData.image) newErrors.image = "Vui lòng chọn hình ảnh";

      // Kiểm tra định dạng thời gian HH:mm
      console.log("formData.startTime:", formData.startTime);
      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
      if (!formData.startTime || !timeRegex.test(formData.startTime.trim())) {
        newErrors.startTime =
          "Thời gian phải đúng định dạng HH:mm (00:00 - 23:59)";
      }

      const priceNumber = Number(formData.price);
      if (isNaN(priceNumber) || priceNumber < 0) {
        newErrors.price = "Giá vé phải là số ≥ 0";
      }

      const showTimeNumber = Number(formData.showTime);
      if (isNaN(showTimeNumber) || showTimeNumber <= 0) {
        newErrors.showTime = "Thời lượng phải là số > 0";
      }

      const seatsNumber = Number(formData.seats);
      if (isNaN(seatsNumber) || seatsNumber <= 0) {
        newErrors.seats = "Số ghế phải là số > 0";
      }

      if (!formData.location?.trim()) {
        newErrors.location = "Vui lòng nhập địa điểm";
      }

      // Nếu có lỗi -> cập nhật lỗi và dừng
      if (Object.keys(newErrors).length > 0) {
        console.log("newErrors:", newErrors);
        setFieldErrors(newErrors);
        throw new Error("Vui lòng kiểm tra lại các trường nhập");
      }

      const form = new FormData();
      form.append("title", formData.title);
      form.append("type", formData.type);
      form.append("date", formData.date); // yyyy-MM-dd
      form.append("startTime", formData.startTime.trim()); // HH:mm
      form.append("showTime", showTimeNumber.toString());
      form.append("price", priceNumber.toString());
      form.append("seats", seatsNumber.toString());
      form.append("location", formData.location);
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
        throw new Error(data.message || "Đã có lỗi xảy ra");
      }

      setSuccess(true);
      setStatusType("success");
      setStatusMessage(`✅ Thêm mới ${formData.type} thành công`);

      setFormData({
        title: "",
        type: "",
        date: "",
        startTime: "",
        showTime: "",
        location: "",
        price: "",
        seats: "",
        image: null,
      });

      await loadEvents();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
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
      window.confirm("Bạn có chắc chắn muốn xóa không?");
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

  const handleUpdate = async (id) => {
    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      const newErrors = {};

      // Validate các trường
      if (!formData.title.trim()) newErrors.title = "Vui lòng nhập tiêu đề";
      if (!formData.type) newErrors.type = "Vui lòng chọn thể loại";
      if (!formData.date) newErrors.date = "Vui lòng chọn ngày";

      // Kiểm tra định dạng thời gian HH:mm
      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
      if (!formData.startTime || !timeRegex.test(formData.startTime.trim())) {
        newErrors.startTime =
          "Thời gian phải đúng định dạng HH:mm (00:00 - 23:59)";
      }

      const priceNumber = Number(formData.price);
      if (isNaN(priceNumber) || priceNumber < 0) {
        newErrors.price = "Giá vé phải là số ≥ 0";
      }

      const showTimeNumber = Number(formData.showTime);
      if (isNaN(showTimeNumber) || showTimeNumber <= 0) {
        newErrors.showTime = "Thời lượng phải là số > 0";
      }

      const seatsNumber = Number(formData.seats);
      if (isNaN(seatsNumber) || seatsNumber <= 0) {
        newErrors.seats = "Số ghế phải là số > 0";
      }

      if (!formData.location?.trim()) {
        newErrors.location = "Vui lòng nhập địa điểm";
      }

      // Nếu có lỗi -> cập nhật lỗi và dừng
      if (Object.keys(newErrors).length > 0) {
        setFieldErrors(newErrors);
        throw new Error("Vui lòng kiểm tra lại các trường nhập");
      }

      const updateData = {
        title: formData.title,
        type: formData.type,
        date: formData.date,
        startTime: formData.startTime.trim(),
        showTime: showTimeNumber,
        price: priceNumber,
        seats: seatsNumber,
        location: formData.location,
      };

      const response = await fetch(`${API_URL}/event/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenObj.accessToken}`,
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Đã có lỗi xảy ra");
      }

      setSuccess(true);
      setStatusType("success");
      setStatusMessage(`✅ Cập nhật ${formData.type} thành công`);

      setTimeout(() => setSuccess(false), 3000);
      return data.data;
    } catch (err) {
      console.error(err);
      setStatusType("error");
      setStatusMessage(`❌ ${err.message}`);
      throw err;
    } finally {
      setTimeout(() => {
        setStatusMessage("");
        setStatusType("");
      }, 3000);
      setLoading(false);
    }
  };

  const loadEventById = async (id) => {
    try {
      const response = await fetch(`${API_URL}/event/${id}`, {
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
      console.log(data);
      return data.data;
    } catch (err) {
      console.log(err);
      throw err;
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
    handleUpdate,
    loadEventById,
  };
};

export default useEvent;
