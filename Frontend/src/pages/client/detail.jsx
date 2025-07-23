import React, { useEffect, useState } from "react";
import {
  Clock,
  Calendar,
  Users,
  Heart,
  Share2,
  Play,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useDetail } from "../../hooks/useDetail";
import { helperFunction } from "../../common/helpers/helper";
import SeatBookingModal from "../../components/SeatBookingModal";

export default function MovieDetailPage() {
  const { id } = useParams();
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const { HandleLogout, handleDetail, getShowtimesByTitleAndDate } = useDetail();
  const [movie1, setMovie] = useState(null);
  const [relatedShowtimes, setRelatedShowtimes] = useState([]);
  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleOpenSeatModal = () => setIsSeatModalOpen(true);
  const handleCloseSeatModal = () => setIsSeatModalOpen(false);

  const { formatDate, formatStartTime } = helperFunction();

  useEffect(() => {
    const fetchDetailAndShowtimes = async () => {
      const data = await handleDetail(id);
      setMovie(data);
      if (data) {
        const showtimes = await getShowtimesByTitleAndDate(data.title, data.date);
        setRelatedShowtimes(showtimes || []);
      }
    };
    fetchDetailAndShowtimes();
  }, [id]);

  const handleShowtimeSelect = (showtime) => {
    setSelectedShowtime(showtime);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold">
              <Link to="/">Online Booking Ticket</Link>
            </div>
            <nav className="flex space-x-6">
              <a href="#" className="hover:text-blue-400 transition-colors">MOVIES</a>
              <a href="#" className="hover:text-blue-400 transition-colors">EVENTS</a>
              <a href="#" className="hover:text-blue-400 transition-colors">TICKETS</a>
            </nav>
          </div>
          <button
            className="border border-white px-4 py-2 rounded-full hover:bg-white hover:text-gray-900 transition-colors"
            onClick={HandleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Movie Hero Section */}
      {movie1 ? (
        <div
          className="h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${movie1.image})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 flex items-center space-x-8">
              <img
                src={movie1.image}
                alt={movie1.name}
                className="w-64 h-80 object-cover rounded-lg shadow-2xl"
              />
              <div className="space-y-4">
                <h1 className="text-5xl font-bold">{movie1.title}</h1>
                <p className="text-xl text-gray-300">
                  Thể loại: {movie1.type === "movie" ? "Phim" : "Sự kiện"}
                </p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span>{movie1.showTime} Phút</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span>{formatDate(movie1.date)}</span>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
                    <Play className="w-5 h-5" />
                    <span>Xem Trailer</span>
                  </button>
                  <button className="border border-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span>Yêu thích</span>
                  </button>
                  <button className="border border-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>Chia sẻ</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      {/* Movie Details */}
      {movie1 ? (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Thông tin phim</h3>
                  <div className="space-y-2 text-gray-300">
                    <div>
                      <span className="font-medium">Thể loại:</span>{" "}
                      {movie1.type === "movie" ? "Phim" : "Sự kiện"}
                    </div>
                    <div>
                      <span className="font-medium">Thời lượng:</span>{" "}
                      {movie1.showTime} Phút
                    </div>
                    <div>
                      <span className="font-medium">Khởi chiếu:</span>{" "}
                      {formatDate(movie1.date)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking */}
            <div>
              <div className="bg-gray-800 rounded-xl p-6 sticky top-4">
                <h3 className="text-2xl font-bold mb-6">Đặt vé xem phim</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Chọn suất chiếu
                    </label>
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                      <div className="bg-gray-700 p-4 rounded-lg shadow">
                        <div className="flex items-center text-blue-400 mb-3 font-semibold">
                          <Users className="w-5 h-5 mr-2" />
                          <span>{movie1.location}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {relatedShowtimes
                            .filter((s) => s.location === movie1.location)
                            .map((showtime, index) => (
                              <button
                                key={index}
                                onClick={() => handleShowtimeSelect(showtime)}
                                className={`p-3 rounded-lg border text-left shadow-sm transition-all duration-150 ${
                                  selectedShowtime?.date === showtime.date &&
                                  selectedShowtime?.startTime === showtime.startTime &&
                                  selectedShowtime?.location === showtime.location
                                    ? "bg-blue-600 border-blue-600 text-white"
                                    : "bg-gray-800 border-gray-600 hover:border-blue-400 hover:bg-gray-700"
                                }`}
                              >
                                <div className="text-sm font-semibold">
                                  {formatStartTime(showtime.startTime)} - {formatDate(showtime.date)}
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                  Giá: {showtime.price} VND
                                </div>
                              </button>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!selectedShowtime}
                    onClick={handleOpenSeatModal}
                  >
                    {selectedShowtime ? "Chọn ghế ngồi" : "Chọn suất chiếu"}
                  </button>

                  {selectedShowtime && (
                    <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                      <h4 className="font-semibold mb-2">Thông tin đặt vé</h4>
                      <div className="text-sm space-y-1 text-gray-300">
                        <div>
                          Suất chiếu: {formatStartTime(selectedShowtime.startTime)}
                        </div>
                        <div>
                          Định dạng: {selectedShowtime.type === "event" ? "Sự kiện" : "Phim"}
                        </div>
                        <div>Giá vé: {selectedShowtime.price} VND</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      {/* Seat Booking Modal */}
      <SeatBookingModal
        open={isSeatModalOpen}
        onClose={handleCloseSeatModal}
        event={selectedShowtime}
        selectedSeats={selectedSeats}
        onSelectSeat={setSelectedSeats}
        rows={["A", "B", "C"]}
        seatsPerRow={8}
      />
    </div>
  );
}
