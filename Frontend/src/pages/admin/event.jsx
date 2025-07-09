import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../components/navbarAdmin";
import SidebarAdmin from "../../components/sidebarAdmin";
import Toast from "../../components/toast";
import useEvent from "../../hooks/useEvent";
import UserActions from "../../components/actionButton";
import { useNavigate } from "react-router-dom";

const EventDashBoard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  let index = 1;
  const navigate = useNavigate();

  const {
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
    events,
    setEvents,
    loadEvents,
  } = useEvent();

  // ⬇️ gọi khi load trang
  useEffect(() => {
    loadEvents();
    const fetchEvents = async () => {
      try {
        const eventList = await handleEvents();
        setEvents(eventList);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <NavbarAdmin toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <SidebarAdmin
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {success && (
          <Toast
            type={statusType}
            message={statusMessage}
            onClose={() => setSuccess(null)}
          />
        )}

        {error && (
          <Toast
            type={statusType}
            message={statusMessage}
            onClose={() => setError(null)}
          />
        )}

        <main className="flex-1 p-6 md:ml-0">
          <h1 className="text-2xl font-bold text-black mb-6">
            Danh sách phim và sự kiện
          </h1>
          {/* Form Section */}
          <div className="bg-white border-2 border-black rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-black mb-6">
              Thêm phim hoặc sự kiện mới
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative w-full">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg ${
                      fieldErrors.title ? "border-red-500" : "border-black"
                    }`}
                    placeholder="Nhập tiêu đề"
                  />
                  {fieldErrors.title && (
                    <span className="absolute text-xs text-red-600 top-full mt-0.5 left-1">
                      {fieldErrors.title}
                    </span>
                  )}
                </div>

                <div className="relative w-full">
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg ${
                      fieldErrors.type ? "border-red-500" : "border-black"
                    }`}
                  >
                    <option value="">-- Chọn thể loại --</option>
                    <option value="movie">Phim</option>
                    <option value="event">Sự kiện</option>
                  </select>
                  {fieldErrors.type && (
                    <span className="absolute text-xs text-red-600 top-full mt-0.5 left-1">
                      {fieldErrors.type}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative w-full">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg ${
                      fieldErrors.date ? "border-red-500" : "border-black"
                    }`}
                  />
                  {fieldErrors.date && (
                    <span className="absolute text-xs text-red-600 top-full mt-0.5 left-1">
                      {fieldErrors.date}
                    </span>
                  )}
                </div>

                <div className="relative w-full">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.files[0] })
                    }
                    className={`w-full px-4 py-3 border-2 rounded-lg ${
                      fieldErrors.image ? "border-red-500" : "border-black"
                    }`}
                  />
                  {fieldErrors.image && (
                    <span className="absolute text-xs text-red-600 top-full mt-0.5 left-1">
                      {fieldErrors.image}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative w-full">
                  <input
                    type="text"
                    name="showTime"
                    value={formData.showTime}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg ${
                      fieldErrors.showTime ? "border-red-500" : "border-black"
                    }`}
                    placeholder="Nhập thời lượng (phút) - ví dụ: 90 hoặc 120"
                  />
                  {fieldErrors.showTime && (
                    <span className="absolute text-xs text-red-600 top-full mt-0.5 left-1">
                      {fieldErrors.showTime}
                    </span>
                  )}
                </div>
                <div className="relative w-full">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg ${
                      fieldErrors.location ? "border-red-500" : "border-black"
                    }`}
                    placeholder="Nhập địa điểm rạp phim"
                  />
                  {fieldErrors.location && (
                    <span className="absolute text-xs text-red-600 top-full mt-0.5 left-1">
                      {fieldErrors.location}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative w-full">
                  <input
                    type="text"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg ${
                      fieldErrors.startTime ? "border-red-500" : "border-black"
                    }`}
                    placeholder="Nhập thời gian bắt đầu (hh:mm)"
                  />
                  {fieldErrors.startTime && (
                    <span className="absolute text-xs text-red-600 top-full mt-0.5 left-1">
                      {fieldErrors.startTime}
                    </span>
                  )}
                </div>
                <div className="relative w-full">
                  <input
                    type="text"
                    name="seats"
                    value={formData.seats}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg ${
                      fieldErrors.seats ? "border-red-500" : "border-black"
                    }`}
                    placeholder="Nhập số lượng ghế ngồi"
                  />
                  {fieldErrors.seats && (
                    <span className="absolute text-xs text-red-600 top-full mt-0.5 left-1">
                      {fieldErrors.seats}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative w-full">
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg ${
                      fieldErrors.price ? "border-red-500" : "border-black"
                    }`}
                    placeholder="Nhập giá vé"
                  />
                  {fieldErrors.price && (
                    <span className="absolute text-xs text-red-600 top-full mt-0.5 left-1">
                      {fieldErrors.price}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={`px-6 py-3 rounded-lg text-white ${
                    loading ? "bg-gray-500" : "bg-black hover:bg-gray-800"
                  }`}
                >
                  {loading ? "Đang xử lý..." : "Thêm mới"}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      title: "",
                      type: "",
                      date: "",
                      image: "",
                      showTime: "",
                    })
                  }
                  className="bg-white text-black border-2 border-black px-6 py-3 rounded-lg"
                >
                  Đặt lại
                </button>
              </div>
            </div>
          </div>

          {/* Event Table */}
          <div className="bg-white border-2 border-black rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b-2 border-black">
              <h2 className="text-2xl font-bold text-black">
                Danh sách phim và sự kiện
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">ID</th>
                    <th className="px-6 py-4 text-left">Hình ảnh</th>
                    <th className="px-6 py-4 text-left">Tiêu đề</th>
                    <th className="px-6 py-4 text-left">Địa điểm</th>
                    <th className="px-6 py-4 text-left">Ngày phát hành</th>
                    <th className="px-6 py-4 text-left">Thời lượng</th>
                    <th className="px-6 py-4 text-left">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id}>
                      <td className="px-6 py-4">{index++}</td>
                      <td className="px-6 py-4">
                        <div
                          className="w-70 h-36 rounded-lg border border-gray-300 shadow bg-gray-100 flex items-center justify-center overflow-hidden relative"
                          style={{
                            backgroundImage: `url(${event.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        ></div>
                      </td>
                      <td className="px-6 py-4">{event.title}</td>
                      <td className="px-6 py-4">{event.location}</td>
                      <td className="px-6 py-4">{formatDate(event.date) }</td>
                      <td className="px-6 py-4">{`${event.showTime} phút`}</td>
                      <td className="px-6 py-4">
                        <UserActions
                          onView={() => navigate(`/admin/event/${event.id}`)}
                          onEdit={() =>
                            navigate(`/admin/event/edit/${event.id}`)
                          }
                          onDelete={() => handleDelete(event.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

export default EventDashBoard;
