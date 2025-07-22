import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../components/navbarAdmin";
import SidebarAdmin from "../../components/sidebarAdmin";
import Toast from "../../components/toast";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../../hooks/useBooking";
import ActiveStatusBooking from "../../components/activeStatusBooking";

const BookingDashBoard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  let index = 1;
  const navigate = useNavigate();

  const {
    bookings,
    statusMessage,
    setStatusMessage,
    statusType,
    setStatusType,
    success,
    setSuccess,
    loadBookings,
    loading,
    toggleStatus,
    error,
    setError
  } = useBooking();


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
            Danh sách booking
          </h1>
          {/* Event Table */}
          <div className="bg-white border-2 border-black rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">ID</th>
                    <th className="px-6 py-4 text-left">Tên người dùng</th>
                    <th className="px-6 py-4 text-left">Tên suất</th>
                    <th className="px-6 py-4 text-left">Địa điểm</th>
                    <th className="px-6 py-4 text-left">Số lượng vé</th>
                    <th className="px-6 py-4 text-left">Tổng tiền</th>
                    <th className="px-6 py-4 text-left">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4">{index++}</td>
                      <td className="px-6 py-4">{booking.userEmail}</td>
                      <td className="px-6 py-4">{booking.eventTitle}</td>
                      <td className="px-6 py-4">{booking.eventLocation}</td>
                      <td className="px-6 py-4">{booking.seats}</td>
                      <td className="px-6 py-4">{booking.totalPrice}</td>
                      <td className="px-6 py-4">
                        <ActiveStatusBooking
                          status={booking.status}
                          onChange={(newStatus) =>
                            toggleStatus(booking.id, newStatus)
                          }
                        >
                          {booking.status}
                        </ActiveStatusBooking>
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

export default BookingDashBoard;
