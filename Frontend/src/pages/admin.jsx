import React, { useState } from "react";
import SidebarAdmin from "../components/sidebarAdmin";
import NavbarAdmin from "../components/navbarAdmin";

// Các phần còn lại của AdminDashboard giữ nguyên
const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    status: "active",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", role: "user", status: "active" });
  };

  return (
    <div className="min-h-screen bg-white">
      <NavbarAdmin toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <SidebarAdmin
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="flex-1 p-6 md:ml-0">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Tổng người dùng", value: "1,234" },
              { label: "Bài viết", value: "567" },
              { label: "Lượt xem", value: "89,012" },
              { label: "Doanh thu", value: "$12,345" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white border-2 border-black p-6 rounded-lg"
              >
                <h3 className="text-sm font-medium text-gray-500">
                  {stat.label}
                </h3>
                <p className="text-3xl font-bold text-black">{stat.value}</p>
              </div>
            ))}
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

export default AdminDashboard;
