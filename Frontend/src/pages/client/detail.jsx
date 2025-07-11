import React, { use, useEffect, useState } from "react";
import {
  Star,
  Clock,
  Calendar,
  Users,
  Heart,
  Share2,
  Play,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useDetail } from "../../hooks/useDetail";

export default function MovieDetailPage() {
  const { id } = useParams();
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { HandleLogout, handleDetail } = useDetail();
  const [movie1, setMovie] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const data = await handleDetail(id);
      setMovie(data);
    };

    fetchDetail();
  }, [id]);

  if (movie1) {
    // Có dữ liệu
    console.log("Có dữ liệu:", movie1);
  } else {
    // Không có dữ liệu
    console.log("movie1 null hoặc undefined");
  }

  const movie = {
    title: "AVATAR: THE WAY OF WATER",
    originalTitle: "Avatar: The Way of Water",
    genre: "Sci-Fi, Action, Adventure",
    duration: "192 phút",
    releaseDate: "16/12/2022",
    director: "James Cameron",
    cast: [
      "Sam Worthington",
      "Zoe Saldana",
      "Sigourney Weaver",
      "Stephen Lang",
    ],
    rating: 8.2,
    description:
      "Bộ phim kể về gia đình Jake Sully khi họ phải rời khỏi ngôi nhà của mình và khám phá các vùng của Pandora. Khi một mối đe dọa cũ trở lại để hoàn thành nhiệm vụ đã bắt đầu trước đó, Jake phải hợp tác với Neytiri và quân đội của chủng tộc Na'vi để bảo vệ hành tinh của họ.",
    poster:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
  };

  const showtimes = [
    { time: "14:00", type: "2D", price: "80,000 VND" },
    { time: "17:30", type: "3D", price: "120,000 VND" },
    { time: "20:45", type: "IMAX", price: "150,000 VND" },
    { time: "22:30", type: "2D", price: "80,000 VND" },
  ];

  const handleShowtimeSelect = (showtime) => {
    setSelectedShowtime(showtime);
  };
  if (!movie1) return <p>Đang tải dữ liệu...</p>;

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
              <a href="#" className="hover:text-blue-400 transition-colors">
                MOVIES
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                EVENTS
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                TICKETS
              </a>
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
      <div className="relative">
        <div
          className="h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 flex items-center space-x-8">
              <img
                src={movie.poster}
                alt={movie1?.title}
                className="w-64 h-80 object-cover rounded-lg shadow-2xl"
              />
              <div className="space-y-4">
                <h1 className="text-5xl font-bold">{movie.title}</h1>
                <p className="text-xl text-gray-300">{movie.originalTitle}</p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span>{movie1?.showtime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span>{movie.date}</span>
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
      </div>

      {/* Movie Details */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Movie Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Nội dung phim</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Nội dung phim
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Thông tin phim</h3>
                <div className="space-y-2 text-gray-300">
                  <div>
                    <span className="font-medium">Thể loại:</span> {movie.type}
                  </div>
                  <div>
                    <span className="font-medium">Thời lượng:</span>{" "}
                    {movie.showtime}
                  </div>
                  <div>
                    <span className="font-medium">Khởi chiếu:</span>{" "}
                    {movie.date}
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
                  <label className="block text-sm font-medium mb-2">
                    Chọn ngày
                  </label>
                  <input
                    type="date"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="2024-12-20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Chọn suất chiếu
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {showtimes.map((showtime, index) => (
                      <button
                        key={index}
                        onClick={() => handleShowtimeSelect(showtime)}
                        className={`p-3 rounded-lg border transition-colors ${
                          selectedShowtime?.time === showtime.time
                            ? "bg-blue-600 border-blue-600"
                            : "bg-gray-700 border-gray-600 hover:border-blue-500"
                        }`}
                      >
                        <div className="text-sm font-medium">
                          {showtime.time}
                        </div>
                        <div className="text-xs text-gray-400">
                          {showtime.type}
                        </div>
                        <div className="text-xs text-blue-400">
                          {showtime.price}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Chọn rạp
                  </label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>CGV Landmark 81</option>
                    <option>Galaxy Nguyễn Du</option>
                    <option>Lotte Cinema Diamond</option>
                    <option>BHD Star Bitexco</option>
                  </select>
                </div>

                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedShowtime}
                >
                  {selectedShowtime ? "Chọn ghế ngồi" : "Chọn suất chiếu"}
                </button>

                {selectedShowtime && (
                  <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                    <h4 className="font-semibold mb-2">Thông tin đặt vé</h4>
                    <div className="text-sm space-y-1 text-gray-300">
                      <div>Suất chiếu: {selectedShowtime.time}</div>
                      <div>Định dạng: {selectedShowtime.type}</div>
                      <div>Giá vé: {selectedShowtime.price}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
