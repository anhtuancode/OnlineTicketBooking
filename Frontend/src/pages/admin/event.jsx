import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../../components/navbarAdmin";
import SidebarAdmin from "../../components/sidebarAdmin";
import Toast from "../../components/toast";
import useUser from "../../hooks/useUser";
import UserActions from "../../components/actionButton";
import ActiveButton from "../../components/activeButton";

const EventDashBoard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    formData,
    handleInputChange,
    handleSubmit,
    loading,
    error,
    success,
    setSuccess,
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
    setError,
  } = useUser();

  // ⬇️ gọi khi load trang
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await renderUser();
        setUsers(userList);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách người dùng:", err);
      }
    };

    fetchUsers();
  }, [success]);

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

        {success && (
          <Toast
            type="success"
            message="✅ Người dùng được tạo với mật khẩu mặc định: 12345678"
            onClose={() => setSuccess(null)}
          />
        )}

        {error && (
          <Toast type="error" message={error} onClose={() => setError(null)} />
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
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-black rounded-lg"
                  placeholder="Nhập tiêu đề"
                />
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-black rounded-lg"
                >
                  <option value="user">Phim</option>
                  <option value="admin">Sự kiện</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-black rounded-lg"
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-black rounded-lg"
                  placeholder="Nhập địa điểm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-black rounded-lg"
                  placeholder="Giá vé"
                />
                <input
                  type="number"
                  name="seats"
                  value={formData.seats}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-black rounded-lg"
                  placeholder="Số ghế"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="w-full px-4 py-3 border-2 border-black rounded-lg"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={`px-6 py-3 rounded-lg text-white ${
                    loading ? "bg-gray-500" : "bg-black hover:bg-gray-800"
                  }`}
                >
                  {loading ? "Đang xử lý..." : "Thêm người dùng"}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      role: "user",
                    })
                  }
                  className="bg-white text-black border-2 border-black px-6 py-3 rounded-lg"
                >
                  Đặt lại
                </button>
              </div>
            </div>
          </div>

          {/* User Table */}
          <div className="bg-white border-2 border-black rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b-2 border-black">
              <h2 className="text-2xl font-bold text-black">
                Danh sách người dùng
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">ID</th>
                    <th className="px-6 py-4 text-left">Tên</th>
                    <th className="px-6 py-4 text-left">Email</th>
                    <th className="px-6 py-4 text-left">Vai trò</th>
                    <th className="px-6 py-4 text-left">Trạng thái</th>
                    <th className="px-6 py-4 text-left">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-200">
                      <td className="px-6 py-4">{user.id}</td>
                      <td className="px-6 py-4 font-medium">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.role}</td>
                      <td className="px-6 py-4">
                        <ActiveButton
                          isActive={user.isActive}
                          onClick={async () => {
                            try {
                              await toggleStatus(user.id, user.isActive);
                              setUsers((prevUsers) =>
                                prevUsers.map((u) =>
                                  u.id === user.id
                                    ? {
                                        ...u,
                                        isActive: user.isActive === 1 ? 0 : 1,
                                      }
                                    : u
                                )
                              );
                              setStatusType("success");
                              setStatusMessage(
                                user.isActive === 1
                                  ? "✅ Đã chuyển sang trạng thái *Chưa hoạt động*"
                                  : "✅ Đã chuyển sang trạng thái *Hoạt động*"
                              );
                            } catch (error) {
                              setStatusType("error");
                              setStatusMessage(
                                "❌ Lỗi khi cập nhật trạng thái người dùng"
                              );
                            }

                            // Tự động ẩn sau 3 giây
                            setTimeout(() => {
                              setStatusMessage("");
                              setStatusType("");
                            }, 3000);
                          }}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <UserActions
                          onEdit={() => navigate(`/admin/user/edit/${user.id}`)}
                          onDelete={() => handleDeleted(user.id)}
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
