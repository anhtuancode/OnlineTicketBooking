import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../components/sidebarAdmin";
import NavbarAdmin from "../../components/navbarAdmin";
import Toast from "../../components/toast";
import { useParams, useNavigate } from "react-router-dom";
import useEvent from "../../hooks/useEvent";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    formData,
    setFormData,
    setError,
    setSuccess,
    handleInputChange,
    error,
    success,
    loading,
    statusMessage,
    statusType,
    fieldErrors,
    handleUpdate,
    loadEventById,
  } = useEvent();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await loadEventById(id);
        setFormData({
          title: event.title || "",
          type: event.type || "",
          showTime: event.showTime || "",
          image: event.image || "",
          date: event.date ? event.date.split("T")[0] : "",
          location: event.location || "",
          price: event.price || "",
          seats: event.seats || "",
          startTime: event.startTime || "",
        });
      } catch (error) {
        console.log(error);
        setError("Không thể tải thông tin sự kiện");
      }
    };

    if (id) fetchEvent();
  }, [id]);

  return (
    <div className="min-h-screen bg-white">
      <NavbarAdmin toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <SidebarAdmin
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {statusMessage && (
          <Toast
            type={statusType}
            message={statusMessage}
            onClose={() => {
              setStatusMessage("");
              setStatusType("");
            }}
          />
        )}

        <main className="flex-1 p-6 md:ml-0">
          <h1 className="text-2xl font-bold text-black mb-6">
            Chỉnh sửa sự kiện hoặc phim
          </h1>

          <div className="bg-white border-2 border-black rounded-lg p-6 mb-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="block mb-1 font-semibold">Tiêu đề</span>
                  <input
                    type="text"
                    name="title"
                    onChange={handleInputChange}
                    value={formData.title}
                    className={`w-full px-4 py-3 border-2 rounded-lg ${
                      fieldErrors.title ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {fieldErrors.title && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.title}</p>
                  )}
                </div>
                <div>
                  <span className="block mb-1 font-semibold">Thể loại</span>
                  <select
                    name="type"
                    onChange={handleInputChange}
                    value={formData.type}
                    className={`w-full px-4 py-3 border-2 rounded-lg ${
                      fieldErrors.type ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Chọn thể loại</option>
                    <option value="movie">Phim</option>
                    <option value="event">Sự kiện</option>
                  </select>
                  {fieldErrors.type && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.type}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="block mb-1 font-semibold">
                    Thời lượng (phút)
                  </span>
                  <input
                    type="number"
                    name="showTime"
                    onChange={handleInputChange}
                    value={formData.showTime}
                    min="1"
                    className={`w-full px-4 py-3 border-2 rounded-lg ${
                      fieldErrors.showTime ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {fieldErrors.showTime && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.showTime}</p>
                  )}
                </div>
                <div>
                  <span className="block mb-1 font-semibold">
                    Ngày phát hành
                  </span>
                  <input
                    type="date"
                    onChange={handleInputChange}
                    name="date"
                    value={formData.date}
                    className={`w-full px-4 py-3 border-2 rounded-lg ${
                      fieldErrors.date ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {fieldErrors.date && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.date}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="block mb-1 font-semibold">Địa điểm</span>
                  <input
                    type="text"
                    name="location"
                    onChange={handleInputChange}
                    value={formData.location}
                    className={`w-full px-4 py-3 border-2 rounded-lg ${
                      fieldErrors.location ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {fieldErrors.location && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.location}</p>
                  )}
                </div>
                <div>
                  <span className="block mb-1 font-semibold">Giá vé</span>
                  <input
                    type="number"
                    name="price"
                    onChange={handleInputChange}
                    value={formData.price}
                    min="0"
                    className={`w-full px-4 py-3 border-2 rounded-lg ${
                      fieldErrors.price ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {fieldErrors.price && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.price}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="block mb-1 font-semibold">Số ghế</span>
                  <input
                    type="number"
                    name="seats"
                    onChange={handleInputChange}
                    value={formData.seats}
                    min="1"
                    className={`w-full px-4 py-3 border-2 rounded-lg ${
                      fieldErrors.seats ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {fieldErrors.seats && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.seats}</p>
                  )}
                </div>
                <div>
                  <span className="block mb-1 font-semibold">
                    Thời gian bắt đầu
                  </span>
                  <input
                    type="text"
                    name="startTime"
                    onChange={handleInputChange}
                    value={formData.startTime}
                    className={`w-full px-4 py-3 border-2 rounded-lg ${
                      fieldErrors.startTime ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {fieldErrors.startTime && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.startTime}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="block mb-1 font-semibold">Hình ảnh</span>
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Hình ảnh sự kiện"
                      className="w-full h-64 object-cover rounded-lg border"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-start gap-4 mt-6">
              <button
                onClick={async () => {
                  try {
                    await handleUpdate(id);
                    // Navigate back to events list after successful update
                    setTimeout(() => {
                      navigate("/admin/event");
                    }, 2000);
                  } catch (error) {
                    console.error("Update failed:", error);
                  }
                }}
                disabled={loading}
                className={`px-6 py-3 font-semibold rounded-lg shadow ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                {loading ? "Đang cập nhật..." : "Cập nhật sự kiện"}
              </button>
              <button
                onClick={() => navigate("/admin/event")}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow"
              >
                Hủy
              </button>
            </div>
          </div>
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default EditEvent;
