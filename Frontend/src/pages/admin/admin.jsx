import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../components/sidebarAdmin";
import NavbarAdmin from "../../components/navbarAdmin";
import { useAdmin } from "../../hooks/useAdmin";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);  
  const [bookingCount, setBookingCount] = useState(0);
  const [total, setTotal] = useState(0);
  const { handleCountUser, loading, handleCountEvent, handleCountTicket, handleTotal} = useAdmin();

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const data = await handleCountUser();
        if (data !== undefined) {
          setUserCount(data.data);
        }
      } catch (err) {
        console.error("Error fetching user count:", err);
      }
    };

    const fetchEventCount = async () => {
      try {
        const data = await handleCountEvent();
        if (data !== undefined) {
          setEventCount(data.data);
        }
      } catch (err) {
        console.error("Error fetching user count:", err);
      }
    };

    const fetchBookingCount = async () => {
      try {
        const data = await handleCountTicket();
        if (data !== undefined) {
          setBookingCount(data.data);
        }
      } catch (err) {
        console.error("Error fetching user count:", err);
      }
    };

    const fetchTotal = async () => {
      try {
        const data = await handleTotal();
        if (data !== undefined) {
          setTotal(data.data);
        }
      } catch (err) {
        console.error("Error fetching user count:", err);
      }
    };

    fetchUserCount();
    fetchEventCount();
    fetchBookingCount();
    fetchTotal();
  }, [handleCountUser, handleCountEvent, , handleTotal, handleCountTicket]);

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
              { label: "Tổng người dùng", value: loading ? "Loading..." : userCount.toString() },
              { label: "Phim & event", value: loading ? "Loading..." : eventCount.toString()  },
              { label: "Số lượng booking", value: loading ? "Loading..." : bookingCount.toString() },
              { label: "Doanh thu", value: loading ? "Loading..." : `${total.toString()} VND` },
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
