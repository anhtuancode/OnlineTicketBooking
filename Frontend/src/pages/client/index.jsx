import { Search, MapPin, Calendar, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavbarLogic } from "../../hooks/useNavbar";

const Index  = () => {
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedCity,
    setSelectedCity,
    selectedPrice,
    setSelectedPrice,
    selectedDate,
    setSelectedDate,
    loading,
    handleAllMovies,
    isLogin,
    HandleLogout,
    events,
    setEvents,
    handleFindMovies,
    handleFindEvents,
    handleSearch,
    handleBookNow
  } = useNavbarLogic();


  useEffect(() => {
    const fetchData = async () => {
      const data = await handleAllMovies();
      setEvents(data);
    };

    fetchData();
  }, []);

  const navItems = ["MOVIES", "EVENTS"];

  return (
    <div
      className="min-h-screen relative overflow-hidden text-white"
      style={{
        backgroundImage: `url('https://simg.zalopay.com.vn/zlp-website/assets/phim_viet_nam_chieu_rap_45_916112a3fa.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 z-5">
        {[
          "top-10 left-10 rotate-12",
          "top-20 right-20 -rotate-12",
          "bottom-32 left-20 rotate-6",
          "bottom-20 right-32 -rotate-6",
        ].map((pos, idx) => (
          <div
            key={idx}
            className={`absolute w-32 h-24 md:w-36 md:h-28 rounded border border-white/10 transform ${pos}`}
          ></div>
        ))}
      </div>

      {/* Navbar */}
      <nav className="relative z-10 px-6 py-4 border-b border-white/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="bg-white text-black px-4 py-2 rounded font-bold text-lg">
            Online Booking Ticket
          </div>
          <div className="hidden md:flex gap-6">
            <button
              onClick={() => {
                setActiveTab("MOVIES");
                handleFindMovies();
              }}
              className={`transition-colors font-medium hover:text-gray-300 ${
                activeTab === "MOVIES"
                  ? "text-white border-b-2 border-white"
                  : "text-gray-300"
              }`}
            >
              MOVIES
            </button>
            <button
              onClick={() => setActiveTab("EVENTS")}
              className={`transition-colors font-medium hover:text-gray-300 ${
                activeTab === "EVENTS"
                  ? "text-white border-b-2 border-white"
                  : "text-gray-300"
              }`}
            >
              EVENTS
            </button>
          </div>

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

      {/* Header Section */}
      <header className="relative z-10 text-center mt-16 max-w-6xl mx-auto px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
          BOOK YOUR <br />
          TICKETS FOR <br />
          <span className="text-white bg-black px-2 border-2 border-white inline-block mt-2">
            MOVIES
          </span>
        </h1>
        <p className="text-gray-200 text-lg mb-12">
          Safe, secure, reliable ticketing. Your ticket to live entertainment!
        </p>

        {/* Search Box */}
        <div className="bg-white/95 text-black rounded-2xl p-8 shadow-2xl border-2 border-gray-300 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            WELCOME TO ONLINE TICKET BOOKING
          </h3>
          <h2 className="text-2xl font-bold mb-6 text-black">
            WHAT ARE YOU LOOKING FOR
          </h2>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            {["ALL", "MOVIES", "EVENTS"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === "MOVIES") {
                    handleFindMovies();
                  } else if (tab === "ALL") {
                    handleAllMovies();
                  } else {
                    handleFindEvents();
                  }
                }}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border-2 ${
                  activeTab === tab
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300 hover:border-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for Movies"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 text-black rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>

            {/* City */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 text-black rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-black focus:border-black appearance-none"
              >
                {["HCM", "HN"].map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Giá */}
            <div className="relative">
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="w-full pl-4 pr-4 py-3 bg-gray-50 text-black rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-black focus:border-black appearance-none"
              >
                <option value="">Mức giá</option>
                <option value="50000">Dưới 100.000đ</option>
                <option value="150000">100.000đ - 300.000đ</option>
                <option value="350000">Trên 300.000đ</option>
              </select>
            </div>

            {/* Date */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 text-black rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>
          </div>

          {/* Button */}
          <div className="mt-6">
            <button
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 font-semibold shadow-lg border-2 border-black transition-all"
              onClick={async () => {
                console.log("Đã click nút Search Movies"); // <- để kiểm tra xem có vào được không
                const data = await handleSearch();
                console.log("Kết quả từ handleSearch:", data); // <- để xem kết quả thực sự là gì
                setEvents(data || []);
              }}
            >
              {loading ? "Loading..." : "Search Movies"}
            </button>
          </div>
        </div>

        {/* Danh sách sự kiện sau nút Search */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.length === 0 && !loading ? (
            <p className="text-white text-center col-span-full">
              No events found
            </p>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="bg-white/90 p-4 rounded-lg shadow-md backdrop-blur-sm border border-gray-300"
              >
                <img
                  src={
                    event.image ||
                    "https://via.placeholder.com/400x200?text=No+Image"
                  }
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-black mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-700 text-sm mb-1">
                  📍 Location: {event.location}
                </p>
                <p className="text-gray-700 text-sm mb-1">
                  🗓️ Date:{" "}
                  {event.date ? new Date(event.date).toLocaleDateString() : ""}
                </p>
                <p className="text-gray-700 text-sm mb-2">
                  🎫 Price: {event.price?.toLocaleString()} VND
                </p>
                <button onClick={() => handleBookNow(event.id)} className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                  Book Now
                </button>
              </div>
            ))
          )}
        </div>
      </header>

      {/* Footer spacing */}
      <div className="mt-16 pb-8"></div>
    </div>
  );
};

export default Index;
