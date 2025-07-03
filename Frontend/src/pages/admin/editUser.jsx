import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../components/sidebarAdmin";
import NavbarAdmin from "../../components/navbarAdmin";
import useUser from "../../hooks/useUser";
import Toast from "../../components/toast";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    formData,
    handleInputChange,
    loading,
    error,
    success,
    setSuccess,
    setFormData,
    fetchUserById,
    handleEdit,
  } = useUser();
  const handleUpdate = async () => {
    const isSuccess = await handleEdit(id, formData);
    if (isSuccess) {
      setTimeout(() => {
        navigate("/admin/user");
      }, 1500);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await fetchUserById(id);
        setFormData({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          role: user.role || "user",
        });
        console.log(user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    if (id) fetchUser();
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
            message="Thay đổi thông tin người dùng thành công ✅"
            onClose={() => setSuccess(null)}
          />
        )}

        {error && (
          <Toast type="error" message={error} onClose={() => setError(null)} />
        )}

        <main className="flex-1 p-6 md:ml-0">
          <h1 className="text-2xl font-bold text-black mb-6">
            Chỉnh sửa người dùng
          </h1>
          {/* Form Section */}
          <div className="bg-white border-2 border-black rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-black mb-6">
              Sửa thông tin người dùng
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-black rounded-lg"
                  placeholder="Nhập tên đầy đủ"
                />
                <input
                  type="email"
                  name="email"
                  readOnly
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-black rounded-lg"
                  placeholder="Nhập email"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-black rounded-lg"
                  placeholder="Nhập số điện thoại"
                />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-black rounded-lg"
                >
                  <option value="user">Người dùng</option>
                  <option value="admin">Quản trị viên</option>
                  <option value="editor">Biên tập viên</option>
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className={`px-6 py-3 rounded-lg text-white ${
                    loading ? "bg-gray-500" : "bg-black hover:bg-gray-800"
                  }`}
                >
                  {loading ? "Đang xử lý..." : "Cập nhật người dùng"}
                </button>
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

export default EditUser;
