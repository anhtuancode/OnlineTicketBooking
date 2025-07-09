import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../components/sidebarAdmin";
import NavbarAdmin from "../../components/navbarAdmin";
import Toast from "../../components/toast";
import { useParams } from "react-router-dom";
import useEvent from "../../hooks/useEvent";

const ViewEvent = () => {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    formData,
    setFormData,
    setError,
    setSuccess,
    error,
    success,
    fieldErrors,
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

        {success && (
          <Toast
            type="success"
            message="Tải thông tin sự kiện thành công ✅"
            onClose={() => setSuccess(null)}
          />
        )}

        {error && (
          <Toast type="error" message={error} onClose={() => setError(null)} />
        )}

        <main className="flex-1 p-6 md:ml-0">
          <h1 className="text-2xl font-bold text-black mb-6">
            Thông tin chi tiết sự kiện hoặc phim
          </h1>

          <div className="bg-white border-2 border-black rounded-lg p-6 mb-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="block mb-1 font-semibold">Tiêu đề</span>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    readOnly
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <span className="block mb-1 font-semibold">Thể loại</span>
                  <input
                    type="text"
                    name="type"
                    value={formData.type}
                    readOnly
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="block mb-1 font-semibold">
                    Thời lượng (phút)
                  </span>
                  <input
                    type="text"
                    name="showTime"
                    value={formData.showTime}
                    readOnly
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <span className="block mb-1 font-semibold">
                    Ngày phát hành
                  </span>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    readOnly
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="block mb-1 font-semibold">Địa điểm</span>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    readOnly
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <span className="block mb-1 font-semibold">Giá vé</span>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    readOnly
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="block mb-1 font-semibold">Số ghế</span>
                  <input
                    type="text"
                    name="seats"
                    value={formData.seats}
                    readOnly
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <span className="block mb-1 font-semibold">
                    Thời gian bắt đầu
                  </span>
                  <input
                    type="text"
                    name="startTime"
                    value={formData.startTime}
                    readOnly
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100"
                  />
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

export default ViewEvent;
