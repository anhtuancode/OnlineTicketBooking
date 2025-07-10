import React, { useState, useEffect } from "react";
import { useNavbarLogic } from "../../hooks/useNavbar";
import { useTicket } from "../../hooks/useTicket";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../../common/constant/app.constant";

const SeatBooking = () => {
  const { id } = useParams();
  const { HandleLogout, isLogin } = useNavbarLogic();
  const { selectedSeats, toggleSeat, rows, seatsPerRow } = useTicket();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`${API_URL}/event/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Không tìm thấy sự kiện");
          return res.json();
        })
        .then((data) => {
          setEvent(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Navbar với glassmorphism */}
      <nav className="bg-black/80 backdrop-blur-md border-b border-white/10 text-white px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            🎬 ONLINE TICKET BOOKING
          </a>
          
          {/* Sign In Button */}

          {isLogin ? (
            <button
              onClick={HandleLogout}
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all font-medium border border-white"
            >
              Logout
            </button>
          ) : (
            <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all font-medium border border-white">
              <Link to="/signin">Sign In</Link>
            </button>
          )}
        </div>
      </nav>

      {/* Main Content với glassmorphism */}
      <div className="max-w-4xl mx-auto mt-10 p-1">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-gray-900 to-black p-6 text-white">
            {loading ? (
              <h2 className="text-2xl font-bold mb-2">Đang tải thông tin sự kiện...</h2>
            ) : error ? (
              <h2 className="text-2xl font-bold mb-2 text-red-400">{error}</h2>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-2">{event?.name || "Rạp Lotte CINEMA TPHCM"}</h2>
                <div className="text-gray-300 flex items-center gap-6">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    Phòng chiếu: <strong>{event?.room || "2"}</strong>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    Thời gian: <strong>{event?.time || "00:00, 27/06/2025"}</strong>
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Movie Info Section */}
          <div className="p-6 bg-gray-50">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-24 h-32 bg-gradient-to-br from-gray-700 to-black rounded-xl shadow-lg flex items-center justify-center text-white font-bold overflow-hidden">
                {event?.poster ? (
                  <img src={event.poster} alt="Poster" className="w-full h-full object-cover" />
                ) : (
                  "POSTER"
                )}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {event?.name || "Dan Dan Dan - Tà Nhân"}
                </h3>
                <p className="text-gray-600 flex items-center gap-2">
                  <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
                  Thời lượng: {event?.duration || 58} phút
                </p>
              </div>
            </div>

            {/* Selected Seats Display */}
            <div className="bg-gradient-to-r from-gray-100 to-white rounded-2xl p-6 border border-gray-300 mb-8 shadow-inner">
              <p className="text-gray-800 font-semibold mb-2 text-center">
                Ghế đã chọn:
              </p>
              <div className="text-center">
                {selectedSeats.length > 0 ? (
                  <div className="flex flex-wrap justify-center gap-2">
                    {selectedSeats.map((seat) => (
                      <span
                        key={seat}
                        className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium shadow-md"
                      >
                        {seat}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-500 italic">
                    Chưa chọn ghế nào
                  </span>
                )}
              </div>
            </div>

            {/* Screen */}
            <div className="text-center mb-8">
              <p className="text-gray-700 text-sm mb-3 font-medium">Màn hình</p>
              <div className="h-3 bg-gradient-to-r from-gray-600 to-black rounded-full shadow-lg mx-auto max-w-md"></div>
            </div>

            {/* Seat Map */}
            <div className="bg-white rounded-2xl p-6 shadow-inner border border-gray-200">
              <div className="space-y-4">
                {rows.map((row) => (
                  <div
                    key={row}
                    className="flex items-center justify-center gap-3"
                  >
                    <span className="w-6 text-center font-bold text-gray-800">
                      {row}
                    </span>
                    <div className="flex gap-2">
                      {[...Array(seatsPerRow)].map((_, i) => {
                        const seat = `${row}${i + 1}`;
                        const isSelected = selectedSeats.includes(seat);

                        return (
                          <button
                            key={seat}
                            onClick={() => toggleSeat(seat)}
                            className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
                              isSelected
                                ? "bg-black text-white shadow-gray-400"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300 border border-gray-300"
                            }`}
                          >
                            {i + 1}
                          </button>
                        );
                      })}
                    </div>
                    <span className="w-6 text-center font-bold text-gray-800">
                      {row}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded border border-gray-300"></div>
                <span className="text-gray-600">Có thể chọn</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-black rounded"></div>
                <span className="text-gray-600">Đã chọn</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-400 rounded"></div>
                <span className="text-gray-600">Đã đặt</span>
              </div>
            </div>

            {/* Confirm Button */}
            <div className="mt-8 text-center">
              <button className="bg-black hover:bg-gray-800 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Xác nhận đặt vé ({selectedSeats.length} ghế)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatBooking;
